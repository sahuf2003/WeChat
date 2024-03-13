import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Usecases = () => {
  return (
    <Container>
      <h1 className="text-info mt-5">Age Detector Use Cases</h1>
      <Row className=" mt-5 d-flex justify-content-center">
        <Col lg={4} style={{ border: "2px solid grey" }} className="mx-2 p-3">
          <h4 style={{ color: "#A93800" }}>Personalized Customer Experience</h4>
          <p>
            SmartClick’s advanced AI technologies stand out with the highest
            accuracy, speed, and scalability.
          </p>
        </Col>
        <Col lg={4} style={{ border: "2px solid grey" }} className="mx-2 p-3">
          <h4 style={{ color: "#A93800" }}>Better Ad Targeting</h4>
          <p>
            Getting detailed metrics on your audience’s age groups may be used
            for more effective ad retargeting. Based on these data, you can
            segment your customers according to their age group to target the
            right people with more relevant content.
          </p>
        </Col>
      </Row>
      <Row className=" mt-5 d-flex justify-content-center">
        <Col lg={4} style={{ border: "2px solid grey" }} className="mx-2 p-3">
          <h4 style={{ color: "#A93800" }}>Content Moderation</h4>
          <p>
            Our age estimation technology can support websites and platforms to
            automatically control access to age-restricted content, such as
            gaming, gambling, violence, adult content, etc. The system may
            prevent minors from viewing inappropriate content, ensuring a safer
            online experience for them.
          </p>
        </Col>
        <Col lg={4} style={{ border: "2px solid grey" }} className="mx-2 p-3">
          <h4 style={{ color: "#A93800" }}>Content Recommendation Systems</h4>
          <p>
            Knowing your customers’ age range can be essential for providing
            personalized content recommendations. You can use these data to show
            products and services that users will find most relevant to engage
            with.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Usecases;
