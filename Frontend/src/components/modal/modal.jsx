import React from 'react'
import "./modal.scss"
import { MdClose } from 'react-icons/md'

function Modal({ children, stateChanger }) {
    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='header'>
                    <h2>Nouveau feed</h2>
                    <MdClose className='md-24' onClick={() => stateChanger(false)}></MdClose>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal