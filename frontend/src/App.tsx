import "./index.css";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import DashBoard from "@pages/DashBoard";
import Register from "@pages/Register";
import Upload from "@pages/Upload";
import Landing from "@pages/Landing";
import UserLayout from "@components/layout/UserLayout";
import Profile from "@pages/profile";
import Settings from "@pages/Settings";
import Quests from "@pages/Quests";
import { Toaster } from "@components/ui/sonner";
import SearchCreators from "@pages/SearchCreators ";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

const MotionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const location = useLocation();

  return (
    <>
      <Toaster richColors />
      {/* <BrowserRouter> */}
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes with header */}
          <Route
            element={
              <>
                <Header />
                <div className="flex h-[calc(100vh-3.5rem)] w-full">
                  <MotionWrapper>
                    <Outlet />
                  </MotionWrapper>
                </div>
              </>
            }
          >
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected routes with Sidebar */}
          <Route path="/user/:userId" element={<UserLayout />}>
            <Route
              index
              element={
                <MotionWrapper key={location.pathname}>
                  <Navigate to="dashboard" replace />
                </MotionWrapper>
              }
            />
            <Route path="upload" element={<Upload />} />
            <Route
              path="dashboard"
              element={
                <MotionWrapper key={location.pathname}>
                  <DashBoard />
                </MotionWrapper>
              }
            />
            <Route
              path="quests"
              element={
                <MotionWrapper key={location.pathname}>
                  <Quests />
                </MotionWrapper>
              }
            />
            <Route
              path="profile"
              element={
                <MotionWrapper key={location.pathname}>
                  <Profile />
                </MotionWrapper>
              }
            />
            <Route
              path="settings"
              element={
                <MotionWrapper key={location.pathname}>
                  <Settings />
                </MotionWrapper>
              }
            />
            <Route
              path="search"
              element={
                <MotionWrapper key={location.pathname}>
                  <SearchCreators />
                </MotionWrapper>
              }
            />
          </Route>

          {/* Fallback for undefined routes */}
          <Route
            path="*"
            element={
              <MotionWrapper key={location.pathname}>
                <Navigate to="/" replace />
              </MotionWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
