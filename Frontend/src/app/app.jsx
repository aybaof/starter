import "../style/style.scss";
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import {Login , SignUp , Dashboard } from "Pages/"
import Login from "./pages/login/login.jsx";
import SignUp from "./pages/signup/signup.jsx"
import Dashboard from "./pages/dashboard/dashboard.jsx";
import useAuth from "./auth.jsx";

function RequireAuth({ children }) {
  const { authed } = useAuth();
  return authed === true ? children : <Navigate to="/login" replace />;
}

const App = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<Login />} />
    </Routes>
  );
};

export default App;
