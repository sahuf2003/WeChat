import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../service/firebase/firebaseConfig";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useSocket } from "../context/SocketProvider";

const PreviewPage = () => {
    const [mystream, setMyStream] = useState(null);
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const socket = useSocket();

    useEffect(() => {
        const getStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                return stream;
            } catch (error) {
                console.error("Error getting user media:", error);
                return null;
            }
        };

        const fetchStream = async () => {
            const stream = await getStream();
            if (stream) {
                setMyStream(stream);
            } else {
                // Handle error or prompt the user to grant camera access
            }
        };
        fetchStream();

        return () => {
            if (mystream) {
                mystream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const getCurrentUserEmail = () => {
        const currentUser = auth.currentUser;
        return currentUser ? currentUser.email : null;
    };

    const fetchSearchingUsers = async () => {
        try {
            const currentUserEmail = getCurrentUserEmail(); // Get the current user's email
            const usersSnapshot = await getDocs(collection(db, "users"));
            const searchingUsers = [];
            const searchingEmails = [];
            usersSnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.searching === true && userData.email !== currentUserEmail) {
                    searchingUsers.push(userData);
                    searchingEmails.push(userData.email);
                }
            });

            console.log("Users searching:", searchingEmails);
            return searchingUsers;
        } catch (error) {
            console.error("Error searching for users:", error);
            return []; // Return an empty array in case of an error
        }
    };


    const createRoom = async () => {
        if (mystream != null) {
            try {
                const user = auth.currentUser;
                const roomNo = Math.floor(Math.random() * 10) + 1;
                await updateDoc(doc(db, 'users', user.uid), {
                    searching: true,
                    room_no: roomNo,
                });
                socket.emit("start:search", { email: user.email, roomNo });
                navigate(`/video-chat-page/${roomNo}`);
                return roomNo;
            } catch (error) {
                console.error("Error creating room:", error);
            }
        } else {
            // Handle case where stream is not available
        }
    };

    const handleStart = async () => {
        try {
            // Update the current user's searching field to true
            const user = auth.currentUser;
            await updateDoc(doc(db, 'users', user.uid), { searching: true });
            const searchingUsers = await fetchSearchingUsers();
            console.log(searchingUsers);
            if (searchingUsers.length === 1) {
                const { email, room_no } = searchingUsers[0];
                navigate(`/video-chat-page/${room_no}`);
            } else if (searchingUsers.length > 1) {
                const randomUserIndex = Math.floor(Math.random() * searchingUsers.length);
                const { email, room_no } = searchingUsers[randomUserIndex];
                navigate(`/video-chat-page/${room_no}`);
            } else {
                const roomNo = await createRoom();
                console.log(`New Room created, room no is ${roomNo}`);
                console.log("No searching users found.");
            }
        } catch (error) {
            console.error("Error starting search:", error);
        }
    };
    

    useEffect(() => {
        if (mystream && videoRef.current) {
            videoRef.current.srcObject = mystream;
        }
    }, [mystream]);

    return (
        <div style={{ height: "90vh", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <Container style={{ maxWidth: "50%", borderRadius: "18px", overflow: "hidden" }}>
                <video ref={videoRef} autoPlay muted style={{ width: "100%", borderRadius: '18px' }} />
            </Container>
            <div style={{ flex: 1, width: "100%", backgroundColor: "#f2f2f2", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "20px" }}>
                <h4 style={{ marginBottom: "20px" }}>Get ready for your video call!</h4>
                <p style={{ marginBottom: "20px", fontStyle: "italic" }}>Do your makeup, fix your hair, and get comfortable.</p>
                <button onClick={handleStart} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Start Searching</button>
            </div>
        </div>
    );
};

export default PreviewPage;
