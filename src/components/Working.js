import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Working = () => {
  return (
    <>
      <Container>
        <Row className="pt-5">
          <Col>
            <h1 className="text-info">How Does It Work?</h1>
            <p>
              The model identifies all the faces in the image and displays the
              estimated age for each person based on the facial attributes. The
              model generates a list containing all the faces in the image,
              showing their corresponding age with probabilities.
            </p>
            <h3 className="text-info">Input</h3>
            <p>The input is an image. </p>
            <h3 className="text-info">Output</h3>
            <p>
              Output is a list of dictionaries, including the coordinates of all
              the faces and the detection probabilities. The location of the
              detected face is in the form of the top-left and bottom-right
              pixel coordinates of the frame. In the corresponding dictionary of
              a face, the value for age and the probability of estimation are
              presented.
            </p>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5">
        <h1 className="text-info">Why Work with SecureSway?</h1>
        <Row className=" mt-5 d-flex justify-content-center">
          <Col lg={3} style={{border: "2px solid grey"}} className="mx-2 p-3">
            <h4 style={{color: "#A93800"}}>Highly Accurate Technologies</h4>
            <p>
              SmartClick’s advanced AI technologies stand out with the highest
              accuracy, speed, and scalability.
            </p>
          </Col>
          <Col lg={3} style={{border: "2px solid grey"}} className="mx-2 p-3">
            <h4 style={{color: "#A93800"}}>Customizable Solutions</h4>
            <p>
              We develop industry-leading solutions that are easily customizable
              to fit exact business requirements.
            </p>
          </Col>
          <Col lg={3} style={{border: "2px solid grey"}} className="mx-2 p-3">
            <h4 style={{color: "#A93800"}}>Professional Team</h4>
            <p>
              Our experts create world-class AI solutions that increase
              automation and drive operational efficiency within companies.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Working;
