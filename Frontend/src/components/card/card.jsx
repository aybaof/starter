import "./card.scss";
import React, { useState } from "react";

import useAuth from "../../app/auth.jsx"
import { UserPostApi } from "../../module/Api/userPost";


import { MdFavorite, MdFavoriteBorder, MdEdit, MdDeleteOutline } from "react-icons/md";

const Card = ({ post, stateChanger, postProps }) => {
	const { id_user, isAdmin } = useAuth();
	const [isLiked, setIsLiked] = useState(post.id_user_like_post === id_user && id_user ? true : false);
	const canModify = id_user === post.id_user_post || isAdmin;

	const deletePost = async () => {
		const res = await UserPostApi.deletePost(post)
		if (res.success) {
			postProps.setPostList(postProps.postList.filter(renderedPost => renderedPost.id_post !== res.data.id_post));
		}
	}

	const likePost = async () => {
		post.toggleLike = isLiked ? -1 : 1
		const res = await UserPostApi.likePost(post)
		if (res.success) {
			setIsLiked(isLiked ? false : true)
			postProps.setPostList(postProps.postList.map(renderedPost => {
				renderedPost.count_like_post = !renderedPost.count_like_post ? 0 : renderedPost.count_like_post
				if (renderedPost.id_post === post.id_post) renderedPost.count_like_post += post.toggleLike
				return renderedPost;
			}))
		}
	}

	return (
		<div className="card_wrapper">
			<div className="img_wrapper">
				<img src={window.location.origin + "/api/images/" + post.img_post_content}></img>
			</div>
			<div className="card_body">
				<div className="text_wrapper">
					<p>{post.text_post_content}</p>
				</div>
				<div className="action_wrapper">
					<span>{post.count_like_post || "0"} likes</span>
					<div className="button_wrapper">
						{canModify ?
							<>
								<button onClick={() => stateChanger(post)}><MdEdit></MdEdit></button>
								<button onClick={deletePost}><MdDeleteOutline></MdDeleteOutline></button>
							</> : null
						}
						<button>
							{
								isLiked && <MdFavorite onClick={likePost} color="red"></MdFavorite>
							}
							{
								!isLiked ? <MdFavoriteBorder onClick={likePost}></MdFavoriteBorder> : null
							}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
