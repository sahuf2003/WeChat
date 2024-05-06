import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room-page/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <Container className="bg-dark" fluid>
      <h1 className="text-white pt-5">Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <Row className="d-flex align-items-center justify-content-center pt-5">
          <Col lg={2}>
          <label htmlFor="email" className="text-white fs-4">
            Email ID
          </label>
          </Col>
          <Col lg={3}>
          <Form.Control
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputStylef"
          />
          </Col>
        </Row>
        <br />
        <Row className="d-flex align-items-center justify-content-center pt-3">
        <Col lg={2}>
        <label htmlFor="room" className="text-white fs-4 mt-4 ">
          Room Number
        </label>
        </Col>
        <Col lg={3}>
        <Form.Control
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="inputStylef"
          />
        </Col>
          </Row>
        <br />
        <button className="joinbtn">
          Join
        </button>
      </form>
    </Container>
  );
};

export default LobbyScreen;
