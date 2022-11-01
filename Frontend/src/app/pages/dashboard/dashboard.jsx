import './dashboard.scss'
import React, { useEffect, useState } from 'react'

import { CgAddR } from 'react-icons/cg'
import { UserPostApi } from '../../../module/Api/userPost'
import { Navbar, Card, Modal, ModalPost } from '../../../components/components.jsx'

const Dashboard = () => {
  const [renderModal, setRenderModal] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await UserPostApi.getPost()
      setPostList(res.data)
    }
    fetch();
  }, [])

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="grid_wrapper">
        {postList.map((post) => {
          return <Card post={post} postProps={{ postList: postList, setPostList: setPostList }} stateChanger={setRenderModal} key={post.id_post}></Card>
        })}
      </div>
      <button onClick={() => setRenderModal({})} className="add_post">
        <CgAddR />
      </button>
      {renderModal && (
        <Modal stateChanger={setRenderModal}>
          <ModalPost postProps={{ postList: postList, setPostList: setPostList }} stateChanger={setRenderModal} post={renderModal} />
        </Modal>
      )}
    </React.Fragment>
  )
}

export default Dashboard
