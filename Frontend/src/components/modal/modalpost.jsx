import React, { useState, useEffect } from 'react'

import { UserPostApi } from "../../module/Api/userPost.js";
import useAuth from "../../app/auth.jsx"
import { toast } from "react-toastify";


import "./modal.scss"
import { MdOutlineFileUpload } from 'react-icons/md'


function ModalPost({ stateChanger, post, postProps }) {

	const { id_user } = useAuth();
	const [file, setFile] = useState();
	const [preview, setPreview] = useState(null);
	const [content, setContent] = useState(post.text_post_content || "");
	const [img, setImg] = useState(post.img_post_content ? `${window.location.origin}/api/images/${post.img_post_content}` : null)

	useEffect(() => {
		if (!file) return
		const objectUrl = URL.createObjectURL(file)
		setPreview(objectUrl)
		return () => URL.revokeObjectURL(objectUrl)
	}, [file])

	const onSelectFile = e => {
		if (!e.target.files || e.target.files.length === 0) {
			setFile(undefined)
			return
		}

		setFile(e.target.files[e.target.files.length - 1])
	}


	const clickHandler = async () => {
		if (!file && !content) return toast.warn("Veuillez ajoutez une image ou du texte")
		const formData = new FormData();
		for (const [key, value] of Object.entries(post)) if (value) formData.set(key, value)
		formData.set("img_post_content", file || post.img_post_content);
		formData.set("text_post_content", content);
		formData.set("id_user", id_user)
		const res = await UserPostApi.newPost(formData)
		if (res.success) {
			stateChanger(false);
			post.id_post_content ?
				postProps.setPostList(postProps.postList.map(arrayPost => arrayPost.id_post_content == res.data.id_post_content ? res.data : arrayPost))
				: postProps.setPostList([res.data, ...postProps.postList])

		}


	}

	return (
		<>
			<div className='form-group'>
				<div className='file_wrapper'>
					<input onChange={onSelectFile} type="file"></input>
					{(file || img) && <div className='img_wrapper'><img src={preview || img}></img></div> || !file && <MdOutlineFileUpload className='md-24'></MdOutlineFileUpload>}
				</div>
			</div>
			<div className='form-group'>
				<label htmlFor="post_text">Contenu du post</label>
				<textarea id="post_text" onChange={({ currentTarget }) => setContent(currentTarget.value)} name="post_content" value={content ? content : ""} cols="30" rows="10" maxLength={250}>
				</textarea>
			</div>
			<div className='action'>
				<button className='btn-secondary' onClick={clickHandler}>Enregistrer</button>
			</div>
		</>
	)
}

export default ModalPost