import "../style/style.scss";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login/login.jsx";
import Dashboard from "./dashboard/dashboard.jsx";
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
      <Route path="/login" element={<Login />}/>
    </Routes>
  );
};

export default App;
