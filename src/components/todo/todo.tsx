import React, { useEffect, useState } from 'react';
import './todo.scss';
import { ITodoProps } from './types';
import { ITodo, IResponseDeleteTodo, INewTodo } from '../../types/global';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Container, Row, Col, Button, ToggleButton, ButtonGroup, Spinner } from 'react-bootstrap';
import Header from '../header';
import URL from '../../utils/urlList';
import Arrow from '../arrowback';
import {  ModalAddTodo } from '../modal';
import moment from 'moment';

function Todo() {
    const { id } = useParams<ITodoProps>();
    const [todo, setTodo] = useState<ITodo>();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getTodo(id);
    }, [id])

    function getTodo(id: string) {
        setLoading(true);
        axios.get(`${URL.TODOS}/${id}`).then((response: AxiosResponse)=>{
            setTodo(response.data);
            setLoading(false);
        })
    }

    function deleteTodo() {
        axios.delete(`${URL.TODOS}/${id}`).then((response: AxiosResponse<IResponseDeleteTodo>) => {
            if(response.data.status === 'Success') {
                goTodoList();
            }
        })
    }

    function changeStatus(status: boolean) {
        axios.put(`${URL.TODOS}/${id}`, {...todo, isFinished: status}).then((response) => {
            if(response.status === 200) {
                setTodo(response.data)
            }
        })
    }

    function saveChangeTodo(newTodo: INewTodo) {
        axios.put(`${URL.TODOS}/${id}`, newTodo).then((response: AxiosResponse) => {
            if(response.status === 200) {
                setTodo(response.data)
            }
            handleCloseModal();
        })
    }

    function goTodoList() {
        document.location.href = '/';
    }

    function handleCloseModal() {
        setShowModal(false);
    }
    function handleOpenModal() {
        setShowModal(true);
    }
    return (
        <div className='todo'>
            <Arrow />
                    {
                        todo 
                        ? <ModalAddTodo 
                            titleModal = 'Edit to do'
                            show = {showModal}
                            todo = {todo}
                            handleClose = {handleCloseModal}
                            handleSave = {saveChangeTodo}
                        />
                        : ''
                    }
                    <Header title={todo ? todo.title : '...'}/>
                    <Container>
                        {   
                            loading 
                            ? <div className='loading'><Spinner animation="border" variant="primary" /> Loading...</div>
                            : !todo 
                            ? ''
                            : <>
                                <Row>
                                    <Col>
                                        <Button variant="primary" onClick={handleOpenModal} disabled = {todo.isFinished}>Edit</Button>
                                        <ButtonGroup toggle>
                                        <ToggleButton
                                            type="radio"
                                            variant="success"
                                            name="radio"
                                            value={true}
                                            checked={todo.isFinished}
                                            onChange={(e) => {changeStatus(true)}}
                                        >
                                            Finished
                                        </ToggleButton>
                                        <ToggleButton
                                            type="radio"
                                            variant="warning"
                                            name="radio"
                                            value={false}
                                            checked={!todo.isFinished}
                                            onChange={(e) => {changeStatus(false)}}
                                        >
                                            Not finished
                                        </ToggleButton>
                                        </ButtonGroup>
                                        <Button variant="danger" onClick={deleteTodo}>Delete</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>Time Create:</Col>
                                    <Col xs={10}>{moment(todo.createdAt).format('DD MMMM YYYY HH:mm')}</Col>
                                </Row>
                                <Row>
                                    <Col>Finished:</Col>
                                    <Col xs={10}>{todo.isFinished ? <span className='done'>&#10003;</span> : <span className='waiting'>waiting...</span>}</Col>
                                </Row>
                                <Row>
                                    <Col>Description:</Col>
                                    <Col xs={10}><span>{todo.description}</span></Col>
                                </Row>
                              </>
                        }
                    </Container>
        </div>
    )
}

export default Todo;