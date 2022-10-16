const { Router } = require("express");
const { signUp  , signIn , authWithjwt} = require("../controllers/auth.js")

const router = Router()

router.post("/signup" , signUp);
router.post("/signin" , signIn);
router.get("/" , authWithjwt);

module.exports = router
