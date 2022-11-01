import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/app.jsx";

import { AuthProvider } from "./app/auth.jsx";
import { IconContext } from "react-icons";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <IconContext.Provider value={{ className: "react-icon" }}>
        <App />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </IconContext.Provider>
    </BrowserRouter>
  </AuthProvider>
);
