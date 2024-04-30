import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { auth, db } from '../service/firebase/firebaseConfig';
import '../styles/navStyle.css';
import { doc, updateDoc } from 'firebase/firestore';

const Navcomp = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const handleWechatClick = async () => {
    try {
      if (user) {
        const user = auth.currentUser;

        // Update user data after signing out
        await updateDoc(doc(db, 'users', user.uid), {
          searching: false
        });

      }
    } catch (error) {
      console.error('Error updating searching field:', error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-dark text-white">
      <Container fluid>
        <Link to="/" className="text-decoration-none">
          <Navbar.Brand className='text-white' onClick={handleWechatClick}>Wechat</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className='text-white'>Solutions</Nav.Link>
            <Nav.Link href="#link" className='text-white'>Work</Nav.Link>
            <Nav.Link href="#link" className='text-white'>Usecase</Nav.Link>
            <Nav.Link href="#link" className='text-white'>Contact</Nav.Link>
            {user ? (
              <Link to="/profile" className="nav-link text-white">
                Profile
              </Link>
            ) : (
              <>
                <Link to="/login" className="nav-link text-white">Login</Link>
                <Link to="/signup" className="nav-link text-white">Sign Up</Link>
              </>
            )}
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default Navcomp;
