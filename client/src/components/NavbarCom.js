import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const NavbarCom = () => {
  const navigate = useNavigate();
  const navBg = {
    backgroundColor: "black",
    color: "white"
  }

  const navigateHome = () => {
    navigate('/');
  }

  const { user, loginWithRedirect } = useAuth0();
  
  return (
    <Container className="bg-dark " fluid>
      <Navbar expand="lg" >
        <Container fluid>
          <Navbar.Brand className='titleStyle' onClick={() => navigateHome()}>WeChat</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="#home" className='text-white'>Home</Nav.Link>
            </Nav>
            <button onClick={() => loginWithRedirect()} className='btn-color'>Log In<span></span><i></i></button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  )
}

export default NavbarCom
