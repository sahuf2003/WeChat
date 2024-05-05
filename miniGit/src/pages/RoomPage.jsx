import React, { useEffect, useCallback, useState } from "react";
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
    const [mysocket, setMysocket] = useState();
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

        return () => {
            socket.off("user:joined", handleUserJoined);
            socket.off("incoming:call", handleIncommingCall);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:nego:needed", handleNegoNeedIncomming);
            socket.off("peer:nego:final", handleNegoNeedFinal);
        };
    }, [
        socket,
        handleUserJoined,
        handleIncommingCall,
        handleCallAccepted,
        handleNegoNeedIncomming,
        handleNegoNeedFinal,
    ]);

    return (
        <Container  className="bg-dark" fluid>
            <h2 className="text-white pt-5">Room Page</h2>
            <h4 className="text-white">{remoteSocketId ? "Connected" : "No one in room"}</h4>
            {myStream && <button onClick={sendStreams} className="joinbtn">Show Video</button>}
            {remoteSocketId && <button onClick={handleCallUser} className="joinbtn">CALL</button>}
            {myStream && (
                <>
                    <h4>My Video</h4>
                    <ReactPlayer
                        playing
                        muted
                        height="100px"
                        width="200px"
                        url={myStream}
                    />
                </>
            )}
            {remoteStream && (
                <>
                    <h4>Remote Video</h4>
                    <ReactPlayer
                        playing
                        muted
                        height="100px"
                        width="200px"
                        url={remoteStream}
                    />
                </>
            )}
        </Container>
    );
};

export default RoomPage;
