// ConfirmationModal.jsx
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

function ConfirmationModal({ isOpen, message, onConfirm, onClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirmation"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                },
            }}
        >
            <p>{message}</p>
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger me-2" onClick={onConfirm}>Confirm</button>
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;
