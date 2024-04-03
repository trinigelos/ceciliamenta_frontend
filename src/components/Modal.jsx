// Modal.jsx
import React from 'react';
import "./CRUD/JobPost.css";

const Modal = ({ message, onClose }) => {
   
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <p>{message}</p>
                <button className='btn-close modal-btn' onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default Modal;
