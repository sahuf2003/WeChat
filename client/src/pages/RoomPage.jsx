import React, { useEffect, useCallback, useState, useRef } from "react";
import ReactPlayer from "react-player";
import peerService from "../service/peerService";
import { useSocket } from "../context/SocketProvider";
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";

const RoomPage = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [myAge, setMyAge] = useState(null);
    const [remoteAge, setRemoteAge] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peerService.getOffer();
        socket.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handleIncommingCall = useCallback(
        async ({ from, offer }) => {
            setRemoteSocketId(from);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setMyStream(stream);
            console.log(`Incoming Call`, from, offer);
            const ans = await peerService.getAnswer(offer);
            socket.emit("call:accepted", { to: from, ans });
        },
        [socket]
    );

    const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peerService.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(
        ({ from, ans }) => {
            peerService.setLocalDescription(ans);
            console.log("Call Accepted!");
            sendStreams();
        },
        [sendStreams]
    );

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peerService.getOffer();
        socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    useEffect(() => {
        peerService.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
            peerService.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);

    const handleNegoNeedIncomming = useCallback(
        async ({ from, offer }) => {
            const ans = await peerService.getAnswer(offer);
            socket.emit("peer:nego:done", { to: from, ans });
        },
        [socket]
    );

    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        await peerService.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        peerService.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    useEffect(() => {
        socket.on("user:joined", handleUserJoined);
        socket.on("incoming:call", handleIncommingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeedIncomming);
        socket.on("peer:nego:final", handleNegoNeedFinal);
        socket.on("age:update", ({ age }) => {
            setRemoteAge(age);
            console.log(remoteAge);
        });
        return () => {
            socket.off("user:joined", handleUserJoined);
            socket.off("incoming:call", handleIncommingCall);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:nego:needed", handleNegoNeedIncomming);
            socket.off("peer:nego:final", handleNegoNeedFinal);
        };
    }, [socket, handleUserJoined, handleIncommingCall, handleCallAccepted, handleNegoNeedIncomming, handleNegoNeedFinal, remoteAge]);

    const captureFrameAndPredictAge = useCallback(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.drawImage(videoRef.current.getInternalPlayer(), 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/jpeg");

        fetch("http://localhost:5000/detect_age", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ image: imageData })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.ages && data.ages.length > 0) {
                    const firstAge = data.ages[0];
                    setMyAge(firstAge);
                    setRemoteAge(firstAge);
                    socket.emit("age:update", { age: firstAge });
                }
            })
            .catch(error => {
                console.error("Error detecting age:", error);
            });
    }, []);

    useEffect(() => {
        if (myStream) {
            const intervalId = setInterval(captureFrameAndPredictAge, 1000); // Capture frame every second
            return () => clearInterval(intervalId);
        }
    }, [myStream, captureFrameAndPredictAge]);

    return (
        <Container className="bg-dark d-flex flex-column align-items-center justify-content-center" fluid>
            <h3 className="text-white pt-5">Room Page</h3>
            <h4 className="text-white">{remoteSocketId ? "Connected" : "No one in room"}</h4>
            {myStream && <button onClick={sendStreams} className="joinbtn">Show Video</button>}
            {remoteSocketId && <button onClick={handleCallUser} className="joinbtn">CALL</button>}
            <div className="d-flex justify-content-center">
                {myStream && (
                    <div style={{ textAlign: 'left', marginRight: '20px' }}>
                        <br />
                        <h5 className="text-white">My Video</h5>
                        <ReactPlayer
                            ref={videoRef}
                            playing
                            muted
                            url={myStream}
                            width="300px"
                            height="auto"
                        />
                        {myAge && (
                            <h4 className="text-white">Your Age: {myAge}</h4>
                        )}
                        <canvas
                            ref={canvasRef}
                            style={{ display: "none" }}
                            width={640}
                            height={480}
                        />
                    </div>
                )}
                {remoteStream && (
                    <div style={{ textAlign: 'left', marginLeft: '40px' }}>
                        <br/>
                        <h5 className="text-white">Remote Video</h5>
                        <ReactPlayer
                            playing
                            muted
                            height="auto"
                            width="300px"
                            url={remoteStream}
                        />
                        {remoteAge && (
                            <h4 className="text-white">Remote Age: {remoteAge}</h4>
                        )}
                    </div>
                )}
                <br />
            </div>
        </Container>
    );
};

export default RoomPage;
