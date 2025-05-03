import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import DashBoard from "@pages/DashBoard";
import Register from "@pages/Register";
import Upload from "@pages/Upload";
import Landing from "@pages/Landing";
import "./index.css";
import UserLayout from "@components/layout/UserLayout";
import Profile from "@pages/profile";
import Settings from "@pages/Settings";
import Quests from "@pages/Quests";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with header */}
        <Route
          element={
            <>
              <Header />
              <div className="flex h-[calc(100vh-3.5rem)] w-full">
                <Outlet />
              </div>
            </>
          }
        >
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes with Sidebar */}
        <Route path="/user/:userId" element={<UserLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="upload" element={<Upload />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="quests" element={<Quests />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
