import React from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Card } from "../components/Card";
import { Girl } from "../components/Girl";
import { Boy } from "../components/Boy";
import { Women } from "../components/Women";

const Home = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/lobby-page")
  }
  return (
    <>
    <Container className="bg-dark" fluid>
      <Row>
        <Col>
        <Button className="btnStyle" onClick={handleRedirect}>Start Video Chat</Button>
        </Col>
        <Col lg={7}>
        <Row>
          <Col lg={5}>
          <Card/>
          <Girl/>
          </Col>
          <Col lg={5}>
          <Boy/>
          <Women/>
          </Col>
        </Row>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Home;
