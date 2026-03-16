import React from "react";
import "./App.css";
import {
  BrowserRouter as Router, // Router for navigation
  Route, // Route for defining path
  Routes, // Wrapper for all routes
  Navigate, // Redirect component
} from "react-router-dom";
import Navbar from "./Commponents/Navbar";
import Regester from "./Commponents/Regester";
import Profile from "./Commponents/Profile";
import ProtectedRoute from "./Commponents/ProtectedRoute";
import PublicRoute from "./Commponents/PublicRoute";
import Login from "./Commponents/Login";

const App = () => {
  return (
    <div className="grid-container">
      <Router>
        {" "}
        <div className="header">
          <Navbar />
        </div>
        <h1 className=" bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent">
          Places View
        </h1>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<h1>Home Page</h1>} />
            <Route
              path="/regester"
              element={
                <PublicRoute>
                  {" "}
                  <Regester />{" "}
                </PublicRoute>
              }
            />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
