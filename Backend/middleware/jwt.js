const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            refreshToken = req.cookies.jwt
            const decoded = jwt.verify(refreshToken, crypto.createHash("sha256").update(process.env.TOKEN, "utf-8").digest("hex"))
            if (req.body.id_user && req.body.id_user !== decoded.id_user) throw "Un probléme est survenu";
            const accessToken = jwt.sign(
                { id_user: decoded.id_user, admin_user: decoded.admin_user },
                crypto.createHash("sha256").update(process.env.TOKEN, "utf-8").digest("hex"),
                { expiresIn: "30m" }

            )
            req.headers.authorization = `Bearer ${accessToken}`;
            res.setHeader("Refresh-Token", accessToken);
        }

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, crypto.createHash("sha256").update(process.env.TOKEN, "utf-8").digest("hex"));
        const userId = decodedToken.id_user;
        if (req.body.id_user && req.body.id_user !== userId && !decodedToken.admin_user) {
            throw "Un probléme est survenu";
        }
        req.user = {
            id_user: userId,
            admin_user: decodedToken.admin_user ? true : false
        }
        req.id_user = userId;
        req.admin_user = decodedToken.admin_user ? true : false
        next()
    } catch (err) {
        res.status(401).json({ error: new Error('Invalid request') })
    }
}