import React, { useState, useEffect } from 'react';
import './main.scss';
import Header from '../header';
import TodoList from '../todosList';
import PanelTodo from '../panelTodo';
import { ModalAddTodo, ModalDeleteTodo } from '../modal';
import axios, { AxiosResponse } from 'axios';
import URL from '../../utils/urlList';
import { ITodo, ITodos, IResponseDeleteTodo, INewTodo } from '../../types/global';
import { IFilter } from './types';
import { Container } from 'react-bootstrap';

function Main() {
    const [showModalAddTodo, setShowModalAddTodo] = useState(false);
    const [modalDeleteTodo, setModalDeleteTodo] = useState({show: false, id: '', title: ''});
    const [todos, setTodos] = useState<ITodos>({items: [], total: 0})
    const [filter, setFilter ] = useState<IFilter>({isFinished: false, isNotFinished: true});
    useEffect(() => {
        getTodos();
    }, [filter])

    function handleCloseModalAddTodo() {
        setShowModalAddTodo(false);
    }

    function handleShowModalAddTodo() {
        setShowModalAddTodo(true)
    }

    function handleCloseModalDeleteTodo() {
        setModalDeleteTodo({show: false, id: '', title: ''});
    }

    function handleShowModalDeleteTodo(id: string, title: string) {
        setModalDeleteTodo({show: true, id, title})
    }

    function addTodo(newTodo: INewTodo) {
        axios.post(URL.TODOS, newTodo).then((response: AxiosResponse)=>{
            handleCloseModalAddTodo();
            getTodos();
        })
    }

    function getTodos() {
        const params = getParams();
        const url = params ? `${URL.TODOS}?${params}` : URL.TODOS;
        axios.get(url).then((response: AxiosResponse<ITodos>) => {
            setTodos(response.data);
        })
    }

    function deleteTodo() {
        const id = modalDeleteTodo.id;
        axios.delete(`${URL.TODOS}/${id}`).then((response: AxiosResponse<IResponseDeleteTodo>) => {
            if(response.data.status === 'Success') {
                getTodos();
                handleCloseModalDeleteTodo();
            }
        })
    }

    function getParams() {
        if(filter.isFinished && filter.isNotFinished) {
            return '';
        }
        if(filter.isFinished) {
            return 'isFinished=true';
        }
        if(filter.isNotFinished) {
            return 'isFinished=false';
        }
        return '';
    }

    function changeFinishedFilter() {
        setFilter({isFinished: !filter.isFinished, isNotFinished: filter.isNotFinished});
    }
    function changeNotFinishedFilter() {
        setFilter({isFinished: filter.isFinished, isNotFinished: !filter.isNotFinished});
    }
    function finishTodo(id: string) {
        const todo = todos.items.filter((item: ITodo) => item.id === id)[0];
        axios.put(`${URL.TODOS}/${id}`, {...todo, isFinished: true}).then((response) => {
            getTodos();
        })
    }
    return (
        <div className='main'>
            <ModalAddTodo 
                show = {showModalAddTodo}
                handleClose = {handleCloseModalAddTodo}
                handleSave = {addTodo}
            />
            <ModalDeleteTodo 
                show = {modalDeleteTodo.show}
                title = {modalDeleteTodo. title}
                id = {modalDeleteTodo.id}
                handleClose = {handleCloseModalDeleteTodo}
                handleOk = {deleteTodo}
            />
            <Header title={`Hi! It's your to do list.`}/>
            <Container>
                <PanelTodo 
                    changeFinishedFilter = {changeFinishedFilter}
                    changeNotFinishedFilter = {changeNotFinishedFilter}
                    filter = {filter}
                    handleShowModalAddTodos = {handleShowModalAddTodo}
        
                />
                <TodoList 
                    finishTodo = {finishTodo}
                    deleteTodo = {handleShowModalDeleteTodo}
                    todos = {todos.items}
                />
            </Container>
        </div>
    )
}

export default Main;