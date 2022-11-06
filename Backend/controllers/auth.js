const { User } = require("../module/model/user")
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

		/* Integrety check */
		if (!(await validator.isEmail(reqMail)))
			return res.status(400).json({ success: false, reason: "Email" });
		if (!(await validator.isStrongPassword(reqPassword, passwordRequirement)))
			return res.status(400).json({ success: false, reason: "Password" });

		const email = reqMail;

		const userClass = new User({ email_user: email, password_user: reqPassword })
		if (await userClass._getUser()) return res.status(400).json({ success: false, reason: "Email already used" })
		const insertUser = await userClass._insertUser();

		if (insertUser) {
			const token = jwt.sign(
				{ id_user: insertUser },
				crypto
					.createHash("sha256")
					.update(process.env.TOKEN, "utf-8")
					.digest("hex"),
				{ expiresIn: "30m" }
			);

			const refreshToken = jwt.sign(
				{ id_user: insertUser },
				crypto
					.createHash("sha256")
					.update(process.env.TOKEN, "utf-8")
					.digest("hex"),
				{ expiresIn: "1d" }
			);

			res.cookie("jwt", refreshToken, {
				httpOnly: false,
				sameSite: "Lax",
				secure: false,
				maxAge: 24 * 60 * 60 * 1000,
			});

			return res.status(201).json({ success: true, token: token, id_user: insertUser });
		} else {
			return res.status(500).json({ success: false, reason: "Une erreur c'est produite sur le serveur" });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

exports.signIn = async (req, res) => {
	try {

		/* Sanitize */



		const reqMail = await validator.trim(req.body.email_user);
		const batchSanitize = await Promise.all([validator.normalizeEmail(reqMail), validator.trim(req.body.password_user)])
		const email = batchSanitize[0];
		const reqPassword = batchSanitize[1];

		const userClass = new User({ email_user: email, password_user: reqPassword })
		const user = await userClass._getUser();
		if (!user)
			return res.status(403).json({ success: false, reason: "Aucun utilisateur trouvée" });

		const authorize = await bcrypt.compare(reqPassword, user.password_user);
		if (!authorize) return res.status(401).json({ success: false, reason: "Verifier vos informations d'identification" });

		const token = jwt.sign(
			{ id_user: user.id_user, admin_user: user.admin_user },
			crypto
				.createHash("sha256")
				.update(process.env.TOKEN, "utf-8")
				.digest("hex"),
			{ expiresIn: "30m" }
		);

		const refreshToken = jwt.sign(
			{ id_user: user.id_user, admin_user: user.admin_user },
			crypto
				.createHash("sha256")
				.update(process.env.TOKEN, "utf-8")
				.digest("hex"),
			{ expiresIn: "1d" }
		);

		res.cookie("jwt", refreshToken, {
			httpOnly: false,
			sameSite: "Lax",
			secure: false,
			maxAge: 24 * 60 * 60 * 1000,
		});

		res.setHeader("Refresh-Token", token);

		return res.status(200).json({ success: true, token: token, id_user: user.id_user, admin_user: user.admin_user });
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
			{ id_user: decoded.id_user, admin_user: decoded.admin_user },
			crypto.createHash("sha256").update(process.env.TOKEN, "utf-8").digest("hex"),
			{ expiresIn: "30m" }

		)
		const user = new User({ id_user: decoded.id_user })
		const detailUser = await user._getUser();
		res.setHeader("Refresh-Token", accessToken)
		res.status(200).json({ success: true, id_user: decoded.id_user, admin_user: decoded.admin_user })
	} catch (err) {
		res.status(401).json({ error: new Error('Invalid request') })
	}
}
