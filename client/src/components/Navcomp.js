import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../styles/navStyle.css';

const Navcomp = () => {

  return (
    <Navbar expand="lg" className="bg-dark text-white">
      <Container fluid>
        <Link to="/" className="text-decoration-none">
          <Navbar.Brand className='text-white'>Wechat</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className='text-white'>Solutions</Nav.Link>
            <Nav.Link href="#link" className='text-white'>Work</Nav.Link>
            <Nav.Link href="#link" className='text-white'>Usecase</Nav.Link>
            <Nav.Link href="#link" className='text-white'>Contact</Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default Navcomp;
