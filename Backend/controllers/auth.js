const { linkBDD } = require("../config_bdd")
const crypto = require('crypto')
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")
const validator = require("validator");

const passwordRequirement = {
    minLength : 7,
    minLowercase : 1,
    minUppercase : 1,
    minNumber : 1,
}

exports.signup = async (req,res) => {
    try {
        req.body.email = await validator.trim(req.body.email)
        req.body.password = await validator.trim(req.body.password)
        const isEmail = await validator.isEmail(req.body.email)
        const isPassword = await validator.isStrongPassword(req.body.password , passwordRequirement)

        if(isEmail && isPassword){
            const email = await validator.normalizeEmail(req.body.email);
            const password = CryptoJS.SHA3(req.body.password);

            const query = "INSERT INTO users (email_user , password_user , admin_user) VALUES (?,?,?)"
            const value = [email , password , 0]
            const insertUser = await linkBDD.query(query , value)
            if(insertUser.insertId > 0){
                res.status(201).json({success : true})
            }
        }

    } catch(err) {
        res.status(500).json(err)
    }
}