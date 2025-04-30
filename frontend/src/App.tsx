import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import DashBoard from "@pages/DashBoard";
import Register from "@pages/Register";
import Landing from "@pages/Landing";
// import VideoPlayerPage from "@pages/VideoPlayerPage";
import "./index.css";
import UserLayout from "@components/layout/UserLayout";
import Profile from "@pages/profile";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes with sidebar */}
          <Route path="/user/:userId" element={<UserLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="profile" element={<Profile />} />
            {/* <Route path="/video" element={<VideoPlayerPage />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
