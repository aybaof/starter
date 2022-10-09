import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/app.jsx";
import { AuthProvider } from "./app/auth.jsx";

import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover 
        />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
