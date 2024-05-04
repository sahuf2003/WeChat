import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import hero from "../images/hero.jpg";

const Intro = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/lobby-page")
  }
  return (
    <Container fluid>
      <Row className="d-flex justify-content-center p-4 mt-3">
        <Col lg={4} className="text-start" >
          <h1 className="text-info" >We chat</h1>
          <p>
            This is an online platform which lets users have random video chats with age detection. Age detection automatically estimates a person’s age from an image or video. The age detection technology uses computer vision to analyze the facial attributes showing a person’s age and estimates their most probable age.
          </p>
          <Button variant="info" className="mt-3" onClick={handleRedirect}>
            Try it Out
          </Button>
        </Col>
        <Col lg={5}>
          <img src={hero} alt="image" className="image-fluid" style={{ borderRadius: '15px' }} />
        </Col>
      </Row>
    </Container>
  );

};

export default Intro;
