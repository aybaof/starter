const multerMiddleware = require("../middleware/multer")
const { addPost, getPost, deletePost, toggleLike } = require("../controllers/userPost.js")

const { Router } = require("express");

const router = Router();

router.get("/", getPost);
router.post("/", multerMiddleware.single("img_post_content"), addPost)
router.put("/", toggleLike)
router.delete("/", deletePost)

module.exports = router