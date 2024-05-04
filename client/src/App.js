import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route as RouteElement } from "react-router-dom";
import Home from "./pages/HomePage";
import Navcomp from "./components/Navcomp";
import LobbyScreen from "./pages/LobbyPage";
import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <div className="App">
      <Navcomp />
      <Routes>
        <RouteElement exact path="/" element={<Home />} />
        <RouteElement path="/lobby-page" element={<LobbyScreen />} />
        <RouteElement path="/room-page" element={<RoomPage/>} />
        <RouteElement path="/room-page/:roomid" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
