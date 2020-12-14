import React from 'react';
import './todosList.scss';
import {  ITodosProps } from './types';
import { ITodo } from '../../types/global';
import {Button, Row, Col} from 'react-bootstrap';


function TodosList(props: ITodosProps) {
    const {
        finishTodo,
        deleteTodo,
        todos = []
    } = props;
    function goto(id: string) {
        document.location.href = `/todos/${id}`
    }
    return (
        <div className='todo-list'>
            {   
                (todos.length != 0) ?
                todos.map((item: ITodo, index: number) => (
                        <Row className={item.isFinished ? 'done' : ''} onClick={() => {goto(item.id)}}>
                            <Col xs={10}>{index + 1}. {item.title}</Col>
                            <Col>
                                {
                                    !item.isFinished ? 
                                    <Button variant="outline-success" onClick={(event) => {
                                            event.stopPropagation()
                                            finishTodo(item.id)
                                        }}
                                    >
                                        &#10003;
                                    </Button>
                                    : ''
                                }
                                <Button variant="outline-danger" onClick={(event) => {
                                        event.stopPropagation()
                                        deleteTodo(item.id, item.title)
                                    }}
                                >
                                    X
                                </Button>
                            </Col>
                        </Row>
                ))
                : <span>No items...</span>
            }
        </div>
    )
}

export default TodosList;