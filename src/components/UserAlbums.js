import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, Card, Button, Modal } from 'react-bootstrap';

const UserAlbums = ({ userId }) => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/albums?userId=${userId}`);
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, [userId]);

  const handleAlbumClick = async (albumId) => {
    try {
      const response = await axios.get(`http://localhost:9999/photos?albumId=${albumId}`);
      setPhotos(response.data);
      setSelectedAlbum(albumId);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
      <h3>User Albums</h3>
      <ListGroup>
        {albums.map((album) => (
          <ListGroup.Item key={album.id} action onClick={() => handleAlbumClick(album.id)}>
            {album.title}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Photos in Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {photos.length > 0 ? (
            <div>
              {photos.map((photo) => (
                <Card key={photo.id} className="mb-3">
                  <Card.Img variant="top" src={"/assets/images/" + photo.image.thumbnail} />
                  <Card.Body>
                    <Card.Title>{photo.title}</Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>No photos found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserAlbums;
