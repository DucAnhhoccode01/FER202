import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Image, ListGroup, Button, Form } from "react-bootstrap";
import axios from "axios";

function PhotoDetails({ user }) {
  const { photoid } = useParams();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]); 
  const [selectedImage, setSelectedImage] = useState(""); 

  const currentUserId = user ? user.id : null;

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const photoResponse = await axios.get(
          `http://localhost:9999/photos?photoId=${photoid}`
        );
        if (photoResponse.data.length > 0) {
          setPhoto(photoResponse.data[0]);
          setSelectedImage(photoResponse.data[0].image.url[0]); 
        }

        const commentsResponse = await axios.get(
          `http://localhost:9999/comments?photoId=${photoid}`
        );
        setComments(commentsResponse.data);

        const usersResponse = await axios.get(`http://localhost:9999/users`); 
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching photo details:", error);
      }
    };

    fetchPhotoDetails();
  }, [photoid]);

  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <Row className="content">
      <Col md={8}>
        <div className="thumbnail">
          <Image
            src={`/assets/images/${selectedImage}`}
            fluid
            alt="Thumbnail"
            className="mb-3"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="photos">
          <Row>
            {photo.image.url.map((imageUrl, index) => (
              <Col xs={4} key={index}>
                <Image
                  src={`/assets/images/${imageUrl}`}
                  fluid
                  alt={`Photo ${index}`}
                  className="mb-3"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedImage(imageUrl)}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Col>

      <Col md={4} style={{ fontSize: "20px" }}>
        <div>Id: {photo.id}</div>
        <div className="tags">
          Tags:{" "}
          {photo.tags.map((tag, index) => (
            <span key={index} className="badge bg-secondary m-1">
              {tag}
            </span>
          ))}
        </div>
      </Col>
      <Col md={12}>
        <h3>Comments</h3>
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <>
                <strong>User {comment.userId}:</strong> {comment.text} <br />
                <span>Rating: {comment.rate}/5</span>
              </>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
}

export default PhotoDetails;
