import React, { useState, useEffect, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPlayer from 'react-player';
import { db, auth } from "../service/firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import "../styles/videoChatPageStyles.css";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const VideoChatPage = () => {
  const [searching, setSearching] = useState(true);
  const [mystream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const navigate = useNavigate();
  const socket = useSocket();

  // Helper function to get the current user's email
  const getCurrentUserEmail = () => {
    const currentUser = auth.currentUser;
    return currentUser ? currentUser.email : null;
  };

  // Event handler for form submission
  const handleSubmitForm = useCallback(async (e) => {
    e.preventDefault();
    const currentUserEmail = getCurrentUserEmail();
    if (currentUserEmail) {
      const room = Math.floor(Math.random() * 10) + 1;
      console.log(room);
      socket.emit("start:search", { email: currentUserEmail, room });
     await handleSearch();
     navigate(`/video-chat-page/${room}`);

    } else {
      console.error("Error: No current user found.");
    }
  }, [socket]);

  // Event handler for searching users
  const handleSearch = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const searchingUsers = [];
      const searchingemails = [];
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.searching === true) {
          searchingUsers.push(userData);
          searchingemails.push(userData.email);
        }
      });

      // console.log("Users searching:", searchingUsers);
      console.log("Users searching:", searchingemails);

    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  // Set user's searching status to true on component mount
  useEffect(() => {
    const setUserSearchingStatus = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, { searching: true });
          console.log("User searching status set to true.");

          const updatedDoc = await getDoc(userDocRef);
          const userData = updatedDoc.data();
          if (userData) {
            console.log("Current searching field value:", userData.searching);
          }
        } else {
          console.error("Error: No current user found.");
        }
      } catch (error) {
        console.error("Error setting user searching status:", error);
      }
    };

    setUserSearchingStatus();
  }, []);

  // Fetch user media stream on component mount
  useEffect(() => {
    const fetchStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
        setMyStream(stream);
      } catch (error) {
        console.error("Error getting user media:", error);
      }
    };
    fetchStream();

    return () => {
      if (mystream) {
        mystream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="video-chat-container">
      <div className="left-column">
        <div className="video-column">
          <div>
            {remoteStream ? (
              <ReactPlayer
                url={remoteStream}
                playing
                height='250px'
                width='450px'
                muted
                className="remote-video"
              />
            ) : (
              <div style={{ height: '250px' }}>
                {/* <CircularProgress style={{ color: "black" }} /> */}
              </div>
            )}
          </div>
          <br />
          <div>
            {mystream ? (
              <ReactPlayer
                url={mystream}
                playing
                height='250px'
                width='450px'
                muted
                className="local-video"
              />
            ) : (
              <CircularProgress style={{ color: "black" }} />
            )}
          </div>
        </div>
      </div>
      <div className="right-column">
        <div className="chat-column">
          <h4>Welcome to the Chat</h4>
          <p>
            Chat, laugh, and see your loved ones like never before! It's more than just talking – it's a blast!
          </p>
          <button onClick={handleSubmitForm}>Search for user</button>
        </div>
      </div>
    </div>
  );
};

export default VideoChatPage;
