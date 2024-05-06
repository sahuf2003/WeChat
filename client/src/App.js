import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route as RouteElement,
} from "react-router-dom";
import Home from "./pages/Home";
import LobbyScreen from "./pages/LobbyPage";
import RoomPage from "./pages/RoomPage.jsx";
import Footer from "./components/Footer";
import { SocketProvider } from "./context/SocketProvider.jsx";
import NavbarCom from "./components/NavbarCom.js";
import Demo from "./pages/Demo.jsx";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Router>
          <NavbarCom />
          <Routes>
            <RouteElement exact path="/" element={<Home />} />
            <RouteElement path="/lobby-page" element={<LobbyScreen />} />
            <RouteElement path="/room-page" element={<RoomPage />} />
            <RouteElement path="/room-page/:roomid" element={<RoomPage />} />
            <RouteElement path="/home" element={<Demo />} />
          </Routes>
        </Router>
      </SocketProvider>
      <Footer />
    </div>
  );
}

export default App;
