import React from 'react';
import './modal.scss';
import { Button, Modal } from 'react-bootstrap';
import { IModalDeleteTodo } from './types';

function ModalAddTodo(props: IModalDeleteTodo) {
    const {
        id,
        title,
        show,
        handleClose,
        handleOk,
    } = props;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you really want to delete <a href={`/todos/${id}`} className='modal-link'>{title}</a>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleOk}>Ok</Button>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddTodo;