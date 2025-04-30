import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import DashBoard from "@pages/DashBoard";
import Register from "@pages/Register";
import Landing from "@pages/Landing";
<<<<<<< HEAD
import Profile from "@pages/profile";
import VideoPlayerPage from "@pages/VideoPlayerPage";
import { useAccount } from "wagmi"; // Import wagmi to track login status
=======
// import VideoPlayerPage from "@pages/VideoPlayerPage";
>>>>>>> e1acb295409ba3f3df07ee3404c7cd62feca064e
import "./index.css";
import UserLayout from "@components/layout/UserLayout";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />

<<<<<<< HEAD
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
=======
          {/* Protected routes with sidebar */}
          <Route path="/user/:userId" element={<UserLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashBoard />} />
            {/* <Route path="/video" element={<VideoPlayerPage />} /> */}
          </Route>
        </Routes>
>>>>>>> e1acb295409ba3f3df07ee3404c7cd62feca064e
      </div>
    </BrowserRouter>
  );
}

export default App;
