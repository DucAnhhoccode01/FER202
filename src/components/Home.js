
import { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Home() {
    const [photos, setPhotos] = useState([]);
    const [filterPhoto, setFilterPhoto] = useState([]);
    const [search, setSearch] = useState("");
    const location = useLocation();
    const urlElement = new URLSearchParams(location.search)
    const album = urlElement.get("album");

    const navigate = useNavigate();

    useEffect(() => {
        // Call API -> get all photos
        axios.get("http://localhost:9999/photos")
            .then(response => {
                setFilterPhoto(response.data);

                let tempPhoto = response.data;

                if(search.length != 0) {
                    tempPhoto = tempPhoto?.filter(p => (p.title.toUpperCase().includes(search.toUpperCase()) ||
                    p.tags.includes(search.toLowerCase())))
                }

                if(album) {
                    tempPhoto = tempPhoto?.filter(p => p.albumId == album)
                }

                setPhotos(tempPhoto)
            })
            .catch(err => console.log("Error: " + err));
        
    }, [search, album]);

    function filterByTag(tag){
        navigate("/photo")
        if(tag!="all"){
            setPhotos(filterPhoto?.filter(p => p.tags.includes(tag.toLowerCase())));
        }else{
            setPhotos(filterPhoto);
        }
    }


    // Get all Tags
    let tagsList = [];
    filterPhoto?.map(p => {
        let photoTags = p.tags; // ["summer", "hot", "new"]
        tagsList = [...tagsList, ...photoTags];
    })
    
    // Iteration tagsList -> add to new Set
    let tagsSet = new Set();
    tagsList.forEach(t => tagsSet.add(t));
    // Push all elements to newArray
    let newTags = [];
    tagsSet?.forEach(t => newTags.push(t));

    return (
        <Row className="content">
            <Col>
                <Container fluid>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }} style={{margin: "10px auto"}}>
                            <div>
                                <Form>
                                    <Form.Group>
                                        <Form.Control placeholder="Enter photo title or tags"
                                            style={{border:"1px solid gray"}}
                                            onChange={e=>setSearch(e.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={10}>
                            <Container fluid>
                                <Row>
                                    {
                                        photos.length>0?
                                        photos?.map(p => (
                                            <Col md={3} style={{ marginBottom: "10px" }} key={p.id}>
                                                <Card key={p.id}>
                                                    <Card.Img variant="top" src={"/assets/images/" + p.image.thumbnail}  style={{ width: '100%', height:"100%"}}/>
                                                    <Card.Body style={{ textAlign: "center" }}>
                                                        <Card.Title>
                                                            <Link to={`/photo/${p.photoId}`}>
                                                                {p.title}
                                                            </Link>
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))
                                        :
                                        <Col md={3} style={{ marginBottom: "10px", color:"red" }}>
                                            Photos not found
                                        </Col>
                                    }
                                </Row>
                            </Container>
                        </Col>
                        <Col className="d-none d-sm-none d-md-block" md={2}>
                            <div>Tags:</div>
                            <Button style={{margin:"5px"}} key={"all"} onClick={()=>filterByTag("all")}>All</Button>
                            {
                                newTags?.map(t => (
                                    <Button style={{margin:"5px"}} key={t}
                                        onClick={()=>filterByTag(t)}>
                                            {t}
                                    </Button>
                                ))
                            }
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    )
}

export default Home;
