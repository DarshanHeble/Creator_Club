import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@components/Header";
import Landing from "@pages/Landing";
import Login from "@pages/Login";
import DashBoard from "@pages/DashBoard";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
