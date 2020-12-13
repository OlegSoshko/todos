import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import './todosList.scss';
import { ITodos, ITodo, IResponseDeleteTodo } from './types';
import URL from '../../utils/urlList';
import {Button, Container, Row, Col} from 'react-bootstrap';


function TodosList () {
    const [todos, setTodos] = useState<ITodos>({items: [], total: 0})
    const [error, setError] = useState(null);
    useEffect(() => {
        getTodos();
    }, [])

    function getTodos() {
        axios.get(URL.GET_TODOS).then((response: AxiosResponse<ITodos>) => {
            setTodos(response.data);
        }).catch((response) => {
            debugger
            setError(response);
        })
    }

    function deleteTodo(id: string) {
        axios.delete(`${URL.DELETE_TODO}/${id}`).then((response: AxiosResponse<IResponseDeleteTodo>) => {
            if(response.data.status === 'Success') {
                getTodos()
            }
        })
    }

    return (
        <div className='todo-list'>
            <Container>
                {
                    todos.items.map((item: ITodo, index: number) => (
                            <Row>
                                <Col>
                                    <input type='checkbox' />
                                </Col>
                                <Col xs={10}>{item.title}</Col>
                                <Col>
                                    <Button variant="outline-danger" onClick={() => {deleteTodo(item.id)}}>
                                        X
                                    </Button>
                                </Col>
                            </Row>
                    ))
                }
            </Container>
        </div>
    )
}

export default TodosList;