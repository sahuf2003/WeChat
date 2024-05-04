import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    const iconStyle = {
        color: "white",
        height: "2.1rem",
        width: "2.1rem"
    }
  return (
    <Container fluid className='bg-dark h-30 mt-5'>
        <Row>
            <Col className='my-5'>
            <FaFacebookF style={iconStyle} className='mx-3'/>
            <FaInstagram style={iconStyle} className='mx-3'/>
            <FaLinkedinIn style={iconStyle} className='mx-3'/>
            <h3 className="text-info mt-4" >SecureSway</h3>
            </Col>
        </Row>
    </Container>
  )
}

export default Footer
