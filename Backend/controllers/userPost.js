const { UserPost } = require("../module/model/userPost.js")

exports.addPost = async (req, res) => {
    const data = req.body
    if (req.file) data.img_post_content = req.file.filename
    data.id_user_post = req.id_user;


    const userPost = new UserPost(data, req.user);
    const operation = userPost.id_post_content ? await userPost._updatePost() : await userPost._insertPost();
    if (!operation) return res.status(500).json({ success: false, reason: "Operation impossible" })
    res.status(200).json({ success: true, data: await userPost._getPost(userPost.id_post) })

}

exports.updatePost = async (req, res) => {
    const data = req.body
    data.id_user_post = req.id_user;
    data.id_post = req.params.id_post;

    const userPost = new UserPost(data, req.user);
    const updatedPost = await userPost._updatePost();

    if (!updatedPost) return res.status(500).json({ success: false, reason: "Impossible de modifier" })
    res.status(200).json({ success: true })
}

exports.getPost = async (req, res) => {
    const userPost = new UserPost(req.params.id_post, req.user);
    const postList = await userPost._getPost();
    res.status(200).json({ success: true, data: postList ? postList : [] })
}

exports.deletePost = async (req, res) => {
    const userPost = new UserPost(req.body, req.user);
    const deletePost = await userPost._deletePost();
    if (!deletePost) return res.status(500).json({ success: false, reason: "Impossible de supprimer" });
    res.status(200).json({ success: true, data: userPost })
}

exports.toggleLike = async (req, res) => {
    const userPost = new UserPost(req.body, req.user);
    const toggleLike = await userPost._likePost();
    if (!toggleLike) return res.status(500).json({ success: false, reason: "Impossible de modifier" });
    res.status(200).json({ success: true, data: userPost })
}