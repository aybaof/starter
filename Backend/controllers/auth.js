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
        req.body.email = await validator.trim(req.body.email_user)
        req.body.password = await validator.trim(req.body.password_user)
        const isEmail = await validator.isEmail(req.body.email_user)
        const isPassword = await validator.isStrongPassword(req.body.password_user , passwordRequirement)

        if(isEmail && isPassword){
            const email = await validator.normalizeEmail(req.body.email_user);
            const password = CryptoJS.SHA3(req.body.password_user);

            const query = "INSERT INTO users (email_user , password_user , admin_user) VALUES (?,?,?)"
            const value = [email , password , 0]
            const insertUser = await linkBDD.query(query , value)
            if(insertUser.insertId > 0){
                res.status(201).json({success : true})
            }
        }

    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
}