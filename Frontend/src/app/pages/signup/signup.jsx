import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "../../auth.jsx"
import icon from "../../../assets/logo/icon-left-font-monochrome-black.png";
// import icon from "../../assets/logo/icon-left-font-monochrome-black.png";
import { toast } from "react-toastify";

const SignUp = () => {

	const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{7,}$/
	const regexEmail = /^\S+@\S+\.\S+$/;

	const [isDisabled, setIsDisabled] = useState(true)
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		setIsDisabled(!regexEmail.test(email) && !regexPassword.test(password))
	}, [email, password])

	const navigate = useNavigate();
	const { signUp } = useAuth();

	const handleSignUp = async (e) => {
		const user = {
			email_user: email,
			password_user: password
		}
		const res = await signUp(user);
		if (!res.success) return toast.warn("Impossible d'enregistrer ce compte")

		navigate("/");
	};

	return (
		<div className="full_wrapper">
			<div className="card">
				<div className="img_wrapper">
					<img src={icon} alt="logo groupomania"></img>
				</div>
				<div className="form_wrapper h-75 w-80 pb-3">
					<h2 className="fs-bold-4 text-center">Inscription</h2>
					<div className="form-group">
						<label htmlFor="email_user">Email</label>
						<input
							className={
								regexEmail.test(email) || email === "" ? "" : "invalid"
							}
							type="text" name="email_user"
							onChange={({ currentTarget }) => setEmail(currentTarget.value)}
						>
						</input>
					</div>
					<div className="form-group">
						<label htmlFor="password_user">Mot de passe</label>
						<input type="password" name="password_user"
							className={
								regexPassword.test(password) || password === "" ? "" : "invalid"
							}
							onChange={({ currentTarget }) => setPassword(currentTarget.value)}>
						</input>
						<p className="faded sm mt-1">Min 7 character 1 uppercase 1 lowercase 1 symbol</p>
					</div>
					<div className="action">
						<button disabled={isDisabled ? true : ""} className="btn-primary w-100
						" onClick={handleSignUp}>Inscription</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
