import React from 'react';
import { ITodoProps } from './types';
import { useParams } from 'react-router-dom';

function Todo() {
    const { id } = useParams<ITodoProps>();

    return (
        <div>
            {`Hi! ${id}`}
        </div>
    )
}

export default Todo;