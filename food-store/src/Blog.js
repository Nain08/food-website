import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap'; 
import './Blog.css';

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/getBlogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="blog-container">
      <Row>
        {blogs.map(blog => (
          <Col key={blog._id} sm={12} md={4}>
            <Card className="custom-card">
              <div className="image-container">
                <Card.Img variant="top" src={blog.image} alt={blog.title} className="card-image" />
                <Card.Text className="image-overlay">
                  <small style={{ padding: '10px' }}>{blog.dateCreated}</small>
                </Card.Text>
              </div>
              <hr style={{ border: "1.05px solid rgb(147, 145, 145)", margin: '0px' }} />
              <Card.Body className="card-body">
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Blog;
