const { linkBDD } = require("../config_bdd");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const passwordRequirement = {
	minLength: 7,
	minLowercase: 1,
	minUppercase: 1,
	minNumber: 1,
};

exports.signUp = async (req, res) => {
	try {
		const reqMail = await validator.trim(req.body.email_user);
		const reqPassword = await validator.trim(req.body.password_user);

		if (!(await validator.isEmail(reqMail)))
			return res.status(400).json({ success: false, reason: "Email" });
		if (!(await validator.isStrongPassword(reqPassword, passwordRequirement)))
			return res.status(400).json({ success: false, reason: "Password" });

		const email = await validator.normalizeEmail(reqMail);
		const password = await bcrypt.hash(reqPassword, 10);
		const query =
			"INSERT INTO users (email_user , password_user , admin_user) VALUES (?,?,?)";
		const value = [email, password, 0];
		const insertUser = await linkBDD.query(query, value);
		if (insertUser.insertId > 0) {
			const token = jwt.sign(
				{ id_user: insertUser.insertId },
				crypto
					.createHash("sha256")
					.update(process.env.TOKEN, "utf-8")
					.digest("hex"),
				{ expiresIn: "30m" }
			);

			const refreshToken = jwt.sign(
				{ id_user: insertUser.insertId },
				crypto
					.createHash("sha256")
					.update(process.env.TOKEN, "utf-8")
					.digest("hex"),
				{ expireIn: "1d" }
			);

			res.cookie("jwt", refreshToken, {
				httpOnly: true,
				sameSite: "None",
				secure: true,
				maxAge: 24 * 60 * 60 * 1000,
			});

			return res.status(201).json({ success: true, token: token });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

exports.signIn = async (req, res) => {
	try {
		const reqMail = await validator.trim(req.body.email_user);
		const reqPassword = await validator.trim(req.body.password_user);

		const email = await validator.normalizeEmail(reqMail);
		const query =
			"SELECT id_user,password_user FROM users WHERE email_user = ?";
		const userRequest = await linkBDD.query(query, [email]);
		if (!userRequest)
			return res.status(404).json({ sucess: false, reason: "not found" });
		const user = userRequest[0];
		const authorize = await bcrypt.compare(reqPassword, user.password_user);
		if (!authorize) return res.status(401).json({ success: false });

		const token = jwt.sign(
			{ id_user: user.id_user },
			crypto
				.createHash("sha256")
				.update(process.env.TOKEN, "utf-8")
				.digest("hex"),
			{ expiresIn: "30m" }
		);

		const refreshToken = jwt.sign(
			{ id_user: user.id_user },
			crypto
				.createHash("sha256")
				.update(process.env.TOKEN, "utf-8")
				.digest("hex"),
			{ expiresIn: "1d" }
		);

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			sameSite: "None",
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		});

		res.setHeader("Refresh-Token", token);

		return res.status(200).json({ success: true, token: token });
	} catch (error) {
		return res.status(500).json({ success: false });
	}
};

exports.authWithjwt = async (req, res) => {
	if (!req.cookies.jwt) return res.status(401).json({ connected: false })
	try {
		refreshToken = req.cookies.jwt
		const decoded = jwt.verify(refreshToken, crypto.createHash("sha256").update(process.env.TOKEN, "utf-8").digest("hex"))
		const accessToken = jwt.sign(
			{ id_user: decoded.id_user },
			crypto.createHash("sha256").update(process.env.TOKEN, "utf-8").digest("hex"),
			{ expiresIn: "30m" }

		)
		req.headers.authorization = `Bearer ${accessToken}`;
		res.status(200)
	} catch (err) {
		res.status(401).json({ error: new Error('Invalid request') })
	}
}
