import "./signup.scss";
import React from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "../auth.jsx"

import icon from "../../assets/logo/icon-left-font-monochrome-black.png";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const makeForm = async () => {
	return await new Promise(resolve => {
		let object = {};
		document.querySelectorAll("input").forEach(item => {
			object[item.name] = item.value
		})
		resolve(object)  
	})
  }
  const handleSignUp = async (e) => {
	  const form = await makeForm();
	  const res  = await signUp(form);
	  if(!res) return alert("Impossible de se connecter")

	  navigate("/");


  };
  return (
	<div className="full_wrapper">
	  <div className="card">
		<div className="img_wrapper">
		  <img src={icon} alt="logo groupomania"></img>
		</div>
		<div className="form_wrapper">
		  <h2>Inscription</h2>
		  <div className="form-group">
			<label htmlFor="email_user">Email</label>
			<input type="text" name="email_user"></input>
		  </div>
		  <div className="form-group">
			<label htmlFor="password_user">Mot de passe</label>
			<input type="password" name="password_user"></input>
			<p className="faded sm m-0">Min 7 character 1 uppercase 1 lowercase 1 symbol</p>
		  </div>
		  <div className="action">
			<button className="btn-primary" onClick={handleSignUp}>Inscription</button>
		  </div>
		</div>
	  </div>
	</div>
  );
};

export default SignUp;
