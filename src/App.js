import "./App.css";
import React, { useState, useEffect } from "react";
import Account from "./component/Account";
import AdminLogin from "./component/AdminLogin";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Home from "./component/Home";
import SpaDetail from "./component/SpaDetail";
import Schedule from "./component/Schedule";
import UserCustomer from "./component/UserCustomer";
import Doctor from "./component/Doctor";
import PetForm from "./component/PetForm";
import Serviceform from "./component/Serviceform";
import BillPet from "./component/BillPet";
import { Routes, Route, Navigate } from "react-router-dom";

// Protected Route để chặn truy cập khi chưa đăng nhập
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    // Lấy username từ localStorage (nếu đã đăng nhập trước đó)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser.username);
    }
  }, []);

  // Xử lý logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUsername("");
  };
  return (
    <Routes>
      {/* Trang home khi chưa đăng nhập */}
      <Route
        path="/"
        element={
          <>
            <Header username={username} onLogout={handleLogout} />
            <Home />
            <Footer />
          </>
        }
      />

      {/* Trang đăng nhập admin */}
      <Route path="/login" element={<AdminLogin setUsername={setUsername} />} />

      {/* Các trang quản trị */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Account username={username} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lich-spa"
        element={
          <ProtectedRoute>
            <SpaDetail username={username} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lich-kham"
        element={
          <ProtectedRoute>
            <Schedule username={username} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/khach-hang"
        element={
          <ProtectedRoute>
            <UserCustomer username={username} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bac-si"
        element={
          <ProtectedRoute>
            <Doctor username={username} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pets"
        element={
          <ProtectedRoute>
            <PetForm username={username} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/service-pets"
        element={
          <ProtectedRoute>
            <Serviceform username={username} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bill-pets"
        element={
          <ProtectedRoute>
            <BillPet username={username} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
