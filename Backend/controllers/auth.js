const { linkBDD } = require("../config_bdd")
const crypto = require('crypto')
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")
const validator = require("validator");

const passwordRequirement = {
	minLength: 7,
	minLowercase: 1,
	minUppercase: 1,
	minNumber: 1,
}

const encodePasswordSha256 = (password) => {
	const hash = CryptoJS.HmacSHA256(password, process.env.TOKEN);
	return CryptoJS.enc.Base64.stringify(hash)
}

exports.signUp = async (req, res) => {
	try {
		const reqMail = await validator.trim(req.body.email_user)
		const reqPassword = await validator.trim(req.body.password_user)

		if (!await validator.isEmail(reqMail)) return res.status(400).json({ success: false, reason: "Email" })
		if (!await validator.isStrongPassword(reqPassword, passwordRequirement)) return res.status(400).json({ success: false, reason: "Password" })


		const email = await validator.normalizeEmail(reqMail);
		const password = encodePasswordSha256(reqPassword);
		const query = "INSERT INTO users (email_user , password_user , admin_user) VALUES (?,?,?)"
		const value = [email, password, 0]
		const insertUser = await linkBDD.query(query, value)
		if (insertUser.insertId > 0) {
			res.status(201).json({ success: true })
		}


	} catch (err) {
		console.log(err);
		res.status(500).json(err)
	}
}

exports.signIn = async (req, res) => {
	try {
		const reqMail = await validator.trim(req.body.email_user);
		const reqPassword = await validator.trim(req.body.password_user);

		const email = await validator.normalizeEmail(reqMail);
		const password = encodePasswordSha256(reqPassword);
		const query = "SELECT id_user,password_user FROM users WHERE email_user = ?"
		const userRequest = await linkBDD.query(query, [email]);

		if (!userRequest) return res.status(404).json({ sucess: false, reason: "not found" });
		if (password !== encodePasswordSha256(userRequest.password_user)) return res.status(401).json({success : false})
		
		const token = jwt.sign({id_user : userRequest.id_user} , process.env.TOKEN);
		return res.status(200).json({success : true , token : token})
	} catch (error) {
		return res.status(500).json({success : false , error : error})
	}
}