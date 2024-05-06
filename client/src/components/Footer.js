import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <Container fluid style={{backgroundColor: "grey",padding: "1rem"}}>
        <h5 className='titleStyle'>WeChat</h5>
      <Row>
        <Col lg={12} md={3}>Terms | Privacy</Col>
        <Col lg={12} md={3}>Customer Service</Col>
        <Col  lg={12} md={3}>Founders: Mohammad Sahuf Zaid Shaikh, Salman Shaikh, Kaif Shaikh, Shruti Pendem</Col>
        <Col lg={12} md={3}>email : help@WeChat.com | Address : 517, Byculla, Mumbai, India</Col>
        <Col lg={12} md={3}> <FaRegCopyright />2024 Hyperconnect LLC. All rights reserved.</Col>
      </Row>
    </Container>
  )
}

export default Footer;
