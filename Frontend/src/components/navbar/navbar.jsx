import "./navbar.scss";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import  useAuth  from "../../app/auth.jsx";


import logo from "../../assets/logo/icon-left-font-monochrome-black.png";

const Navbar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const logOut = () => {

    let { from } = location.state || { from: { pathname: "/" } };
    signOut()
    navigate("/")

  }

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar-links">
        <Link className="text_link" to="/dashboard">
          Dashboard
        </Link>
        <a
          onClick={logOut}
          type="button" href="#" className="text_link">Log out</a>
      </div>
    </div>
  );
};

export default Navbar;
