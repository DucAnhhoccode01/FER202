import { useEffect, useState } from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header({ user, setUser }) {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy danh sách albums từ API
    axios
      .get("http://localhost:9999/albums")
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <Row className="header">
      <Col xs={12} className="top">
        <Container fluid>
          <Row>
            <Col xs={3}>
              <Link to={"/"}>
                <Image
                  className="logo"
                  src="logo.png"
                  rounded
                  style={{ width: "70%" }}
                />
              </Link>
            </Col>
            <Col
              xs={9}
              style={{ display: "flex", justifyContent: "end", margin: "auto" }}
            >
              {user ? (
                <>
                  <div style={{ marginRight: 10 }}>
                    <strong>{user.name}</strong>
                  </div>
                  <div
                    onClick={handleProfileClick}
                    style={{ cursor: "pointer" }}
                  >
                    Profile
                  </div>
                </>
              ) : (
                <>
                  <Link style={{ marginRight: 10 }} to={"/auth/login"}>
                    Login
                  </Link>
                  <Link to={"/auth/register"}>Register</Link>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Col>

      <Col xs={12} className="menu">
        <ul>
          {albums?.map((a) => (
            <li key={a.id}>
              <Link to={`/photo?album=${a.albumId}`}>{a.title}</Link>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  );
}

export default Header;
