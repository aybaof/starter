const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = (req, res, next) => {
    try {
        if(req.cookie?.jwt){
            refreshToken = req.cookie.jwt
            const decoded = jwt.verify(refreshToken , crypto.createHash("sha256").update(process.env.TOKEN, "utf-8").digest("hex"))
            if(req.body.id_user && req.body.id_user !== decoded.id_user) throw "Un probléme est survenu";
            const accessToken = jwt.sign(
                {id_user : decoded.id_user},
                crypto.createHash("sha256").update(process.env.TOKEN, "utf-8").digest("hex"),
                {expiresIn : "30m"}
                
            )
            req.headers.authorization = `Bearer ${accessToken}`; 
            res.setHeader("Refresh-Token" , accessToken);
        }
        
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token , crypto.createHash("sha256").update(process.env.TOKEN, "utf-8").digest("hex"));
        const userId = decodedToken.id_user;
        if(req.body.id_user && req.body.id_user !== userId){
            throw "Un probléme est survenu";
        }
        req.id_user = userId;
        next()
    } catch(err){
        res.status(401).json({error : new Error('Invalid request')})
    }
}