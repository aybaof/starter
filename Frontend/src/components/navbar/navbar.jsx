import "./navbar.scss";
import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import useAuth from "../../app/auth.jsx";

import { MdMenu, MdClose } from "react-icons/md";



import logo from "../../assets/logo/icon-left-font-monochrome-black.png";

const Navbar = () => {
	const { signOut } = useAuth();
	const navigate = useNavigate();
	const [menuToggle, setMenuToggle] = useState(false)
	const logOut = () => {
		signOut()
		navigate("/")
	}



	return (
		<div className="navbar">
			<div className="navbar-logo pl-3">
				<img src={logo} alt="logo" />
			</div>
			<div className="navbar-links pr-3">
				<Link className="text_link ml-2 p-3" to="/dashboard">
					Dashboard
				</Link>
				<a
					onClick={logOut}
					type="button" href="#" className="text_link p-3">Log out</a>
			</div>
			<div className="navbar-links-responsive pr-3">
				<button className="btn p-3" onClick={() => setMenuToggle(true)}><MdMenu className="md-24"></MdMenu></button>
				{menuToggle &&
					<ul className="drawer pt-5 pl-0">
						<button className="btn p-3" onClick={() => setMenuToggle(false)}><MdClose className="md-36"></MdClose></button>
						<li className="mb-3 w-100 p-3">
							<Link className="text_link" to="/dashboard">
								Dashboard
							</Link>
						</li>
						<li className="mb-3 w-100 p-3">
							<a
								onClick={logOut}
								type="button" href="#" className="text_link">Log out</a>
						</li>
					</ul>}
			</div>
		</div>
	);
};

export default Navbar;
