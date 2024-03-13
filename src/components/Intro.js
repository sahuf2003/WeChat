import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import hero from "../images/hero.jpg"

const Intro = () => {
  return (
    <Container fluid>
        <Row className='d-flex justify-content-center p-4 mt-3'>
            <Col lg={4} className='text-start' >
                <h1 className='text-info'>We chat</h1>
                <p>This is an online platform which lets user to have random video  chat with age detection Age detection automatically estimates a person’s age from an image or video. A significant number of images taken at various ages serves as the basis for the age detector model's construction. The age detection technology uses computer vision to analyze the facial attributes showing a person’s age and estimates their most probable age.</p>
                <Button variant="info" href="#" className='mt-3'>Try it Out</Button>
            </Col>
            <Col lg={5}>
                <img src={hero} alt="image" className='image-fluid'/>
            </Col>
        </Row>
    </Container>
  )
}

export default Intro
