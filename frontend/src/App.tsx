import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "@components/Sidebar";
import Header from "./components/Header";
import DashBoard from "@pages/DashBoard";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Landing from "@pages/Landing";
import Profile from "@pages/profile";
import VideoPlayerPage from "@pages/VideoPlayerPage";
import { useAccount } from "wagmi"; // Import wagmi to track login status
import "./index.css";

function App() {
  const { isConnected } = useAccount(); // Check if the user is logged in

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {/* Conditionally Render Sidebar */}
        {isConnected && <Sidebar />}

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <Header />

          {/* Routes */}
          <div className={isConnected ? "mt" : ""}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/video" element={<VideoPlayerPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
