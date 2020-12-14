import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { IModalAddTodoProps } from './types';

function ModalAddTodo(props: IModalAddTodoProps) {
    const {
        todo,
        show,
        handleClose,
        handleSave,
    } = props;

    const [title, setTitle] = useState(todo ? todo.title : '')
    const [description, setDescription] = useState(todo ? todo.description : '');
    function changeTitle(e: React.FocusEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }
    function changeDescription(e: React.FocusEvent<HTMLTextAreaElement>) {
        setDescription(e.target.value);
    }
    function handleClickOk() {
        const newTodo = {
            description: description,
            isFinished: false,
            title: title
        }
        if(!todo) {
            setTitle('');
            setDescription('');
        }
        handleSave(newTodo);
    }

    function handleCloseModal() {
        if(todo) {
            setTitle(todo.title);
            setDescription(todo.description);
        } else {
            setTitle('');
            setDescription('');
        }
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add new to do</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="formGroupTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" onChange={changeTitle} value={title}/>
                </Form.Group>
                <Form.Group controlId="formGroupDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={changeDescription} value={description}/>
                </Form.Group>
            </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={handleClickOk}>{todo ? 'Save' :'Add' }</Button>
                <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddTodo;