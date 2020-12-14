import React from 'react';
import './panelTodo.scss';
import {Row, Col, Button, DropdownButton, Container} from 'react-bootstrap';

function PanelTodo(props: any) {
    const {
        handleShowModalAddTodos,
        changeFinishedFilter,
        changeNotFinishedFilter,
        filter,
    } = props;

    return (
        <div className='panelTodo'>
            <Row>
                <Col>
                    <Button variant="primary" onClick={handleShowModalAddTodos}>Add</Button>
                    <DropdownButton
                        title = 'Filter'
                        menuAlign="right"
                    >
                        <span className='line' onClick={changeFinishedFilter}><input type='checkbox' checked={filter.isFinished}/>Finished</span>
                        <span className='line' onClick={changeNotFinishedFilter}><input type='checkbox' checked={filter.isNotFinished}/>Not finished</span>
                    </DropdownButton>
                </Col>
            </Row>
        </div>
    )
}
export default PanelTodo;