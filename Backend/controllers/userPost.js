const { UserPost } = require("../module/model/userPost.js")

exports.addPost = async (req, res) => {
    const data = req.body
    if (req.file) data.img_post_content = req.file.filename
    data.id_user_post = req.id_user;


    const userPost = new UserPost(data, req.id_user);
    const operation = userPost.id_post_content ? await userPost._updatePost() : await userPost._insertPost();
    if (!operation) res.status(500).json({ success: false, reason: "Operation impossible" })
    res.status(200).json({ success: true, data: userPost })

}

exports.updatePost = async (req, res) => {
    const data = req.body
    data.id_user_post = req.id_user;
    data.id_post = req.params.id_post;

    const userPost = new UserPost(data, req.id_user);
    const updatedPost = await userPost._updatePost();

    if (!updatedPost) res.status(500).json({ success: false, reason: "Impossible de modifier" })
    res.status(200).json({ success: true })
}

exports.getPost = async (req, res) => {
    const userPost = new UserPost(req.params.id_post, req.id_user);
    const postList = await userPost._getPost();
    res.status(200).json({ success: true, data: postList ? postList : [] })
}

exports.deletePost = async (req, res) => {
    const userPost = new UserPost(req.body, req.id_user);
    const deletePost = await userPost._deletePost();
    if (!deletePost) res.status(500).json({ success: false, reason: "Impossible de supprimer" });
    res.status(200).json({ success: true, data: userPost })
}

exports.toggleLike = async (req, res) => {
    const userPost = new UserPost(req.body, req.id_user);
    const toggleLike = await userPost._likePost();
    if (!toggleLike) res.status(500).json({ success: false, reason: "Impossible de modifier" });
    res.status(200).json({ success: true, data: userPost })
}