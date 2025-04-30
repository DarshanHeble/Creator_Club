import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "@components/Sidebar";
import Header from "./components/Header";
import DashBoard from "@pages/DashBoard";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Landing from "@pages/Landing";
import VideoPlayerPage from "@pages/VideoPlayerPage";
import CloudinaryUpload from "../CloudinaryUpload";
import { useAccount } from "wagmi";
import "./index.css";

function App() {
  const { isConnected } = useAccount();

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {isConnected && <Sidebar />}
        <div className="flex-1">
          <Header />
          <div className={isConnected ? "mt-14" : ""}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/video" element={<VideoPlayerPage />} />
              <Route path="/cloudinary-upload" element={<CloudinaryUpload />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;