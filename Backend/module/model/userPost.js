const { MyDataBase } = require("../database.js");
const { deleteImg } = require("../../module/global_function")



class UserPost extends MyDataBase {
    constructor(userPost = {}, user) {
        super()

        this.id_user = user.id_user
        this.admin_user = user.admin_user
        this.toggleLike = userPost.toggleLike

        this.id_post = userPost.id_post
        this.id_user_post = userPost.id_user_post
        this.count_like_post = userPost.count_like_post

        this.id_post_content = userPost.id_post_content
        this.id_post_post_content = userPost.id_post_post_content
        this.img_post_content = userPost.img_post_content
        this.text_post_content = userPost.text_post_content

        this.id_user_like_post = userPost.id_user_like_post
        this.id_post_user_like_post = userPost.id_post_user_like_post;
        this.id_user_user_like_post = userPost.id_user_user_like_post;



        this.defaultTable = "posts";
        this.contentTable = "posts_content";
        this.likeTable = "user_like_post";
    }

    async _insertPost() {
        try {
            const queryPost = `INSERT INTO ${this.defaultTable} (id_user_post) VALUES (?)`;
            const valuesPost = [this.id_user_post];
            this.id_post = await this._commit(queryPost, valuesPost);
            if (this.img_post_content || this.text_post_content) {
                const queryPostContent = `INSERT INTO ${this.contentTable} (id_post_post_content , img_post_content , text_post_content) VALUES (?,?,?)`;
                const valuePostContent = [this.id_post, this.img_post_content || null, this.text_post_content || null];
                this.id_post_content = await this._commit(queryPostContent, valuePostContent);
            }
            return true
        } catch (err) {
            return false
        }
    }

    async _updatePost() {
        try {
            const queryPost = `
            UPDATE ${this.contentTable} A INNER JOIN ${this.defaultTable} B ON A.id_post_post_content = B.id_post
            SET A.id_post_post_content = ? , A.img_post_content = ? , A.text_post_content = ?
            WHERE (B.id_user_post = ? OR ${this.admin_user}=true) AND A.id_post_content = ?`
            const valuePost = [this.id_post_content, this.img_post_content, this.text_post_content, this.id_user_post, this.id_post_content];
            const commit = await this._commit(queryPost, valuePost);
            return commit;
        } catch (err) {
            return false;
        }
    }

    async _getPost() {
        try {
            const condition = this.id_post ? "WHERE A.id_post=?" : "";
            const query = `
        SELECT * FROM ${this.defaultTable} A
        INNER JOIN ${this.contentTable} B ON A.id_post=B.id_post_post_content
        LEFT JOIN (SELECT * FROM ${this.likeTable} WHERE id_user_user_like_post = ?) C ON A.id_post=C.id_post_user_like_post
        ${condition}
        ORDER BY created_post DESC`
            const value = [this.id_user, this.id_post ? this.id_post : null];
            return this.id_post ? await this._fetch(query, value) : await this._fetchAll(query, value);
        } catch (err) {
            return false;
        }
    }

    async _likePost() {
        try {
            const query = this.toggleLike === 1 ? `INSERT INTO ${this.likeTable} (id_post_user_like_post , id_user_user_like_post) VALUES (? , ?)` : `DELETE FROM ${this.likeTable} WHERE id_post_user_like_post = ? AND id_user_user_like_post = ?`
            const value = [this.id_post, this.id_user];
            const commit = this._commit(query, value);
            if (commit) {
                const queryIncrement = `UPDATE ${this.defaultTable} SET count_like_post = count_like_post + ? WHERE id_post = ?`;
                const value = [this.toggleLike, this.id_post];
                const commit = this._commit(queryIncrement, value);
                return commit;
            }
        } catch (err) {
            return false;
        }
    }

    async _deletePost() {
        const query = `
        DELETE FROM ${this.defaultTable}
        WHERE id_post = ? AND (id_user_post = ? OR ${this.admin_user}=true)
        `
        const value = [this.id_post, this.id_user];
        const isDeleted = await this._commit(query, value)
        if (isDeleted && this.img_post_content) {
            deleteImg(this.img_post_content);
        }
        return isDeleted;
    }


}

exports.UserPost = UserPost;