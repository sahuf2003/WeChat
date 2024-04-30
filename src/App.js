import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route as RouteElement } from "react-router-dom";
import Home from './pages/homepage';
import VideoChatPage from './pages/videochatpage';
import Navcomp from "./components/Navcomp";
import NameEntryPage from "./pages/nameEntryPage";
import RoomPage from "./pages/roompage";
import LoginPage from "./pages/loginpage";
import SignUpPage from "./pages/signUpPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import ProfilePage from "./pages/profile";
import PreviewPage from "./pages/previewPage";
function App() {
  return (
    <div className="App">
      <Navcomp />
      <Routes>
        <RouteElement exact path="/" element={<Home />} />
        <RouteElement exact path="/login" element={<LoginPage />} />
        <RouteElement exact path="/signup" element={<SignUpPage />} />
        <RouteElement exact path="/profile" element={<ProfilePage />} />
        <RouteElement path="/preview-page" element={<PreviewPage />} />
        <RouteElement path="/video-chat-page" element={<VideoChatPage />} />
        <RouteElement path="/video-chat-page/:roomid" element={<VideoChatPage />} />
      </Routes>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default App;
