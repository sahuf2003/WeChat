import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../service/firebase/firebaseConfig";
import hero from "../images/hero.jpg";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Intro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      // If there is no current user, do nothing
      return;
    }

    const getUserOnlineStatus = async () => {
      try {
        // Get the document reference for the current user
        const userDocRef = doc(db, "users", currentUser.uid);

        // Fetch the document snapshot
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          // Access the document data
          const userData = userDocSnapshot.data();
          console.log("User data:", userData);

          // Access specific fields, such as online status
          const userOnline = userData.online;
          console.log("User online status:", userOnline);

          // Use the user online status here as needed
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching user online status:", error);
      }
    };

    getUserOnlineStatus();

    // Clean up subscription
    return () => {
      // Unsubscribe or clean up any listeners if needed
    };
  }, []);

  const handleRedirect = async () => {
    const currentUser = auth.currentUser;

    // Update only the online field of the user document
    await updateDoc(doc(db, 'users', currentUser.uid), {
      searching: false,
      online: true,
    });

    if (currentUser) {
      navigate("/preview-page");
    } else {
      navigate("/login");
    }
  };

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
