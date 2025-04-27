import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
import DashBoard from "@pages/DashBoard";
import Login from "@pages/Login";
import Landing from "@pages/Landing";
import VideoPlayerPage from "@pages/VideoPlayerPage";
import "./index.css";
import { useConnectionStatus } from "@hooks/useConnectionStatus";

function App() {
  const isConnected = useConnectionStatus();
  console.log("Connection status:", isConnected);

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/header" element ={<Header />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/video" element={<VideoPlayerPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
