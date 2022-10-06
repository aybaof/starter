import "./navbar.scss";
import React from "react";
import { Link } from "react-router-dom";
import { CgAddR } from "react-icons/cg";

import logo from "../../assets/logo/icon-left-font-monochrome-black.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar-links">
        <Link className="text_link" to="/dashboard">
          Dashboard
        </Link>
        <Link className="add_post" to="/newPost">
          <CgAddR/>
        </Link>
        <a href="#" className="text_link">Log out</a>
      </div>
    </div>
  );
};

export default Navbar;
