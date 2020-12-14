import { ITodo } from '../../types/global';
export interface ITodosProps {
    handleShowModalAddTodos?: () => void;
    finishTodo: (id: string) => void;
    deleteTodo: (id: string, title: string) => void;
    todos?: ITodo[];
}

export interface IResponseDeleteTodo {
    status: string;
    message: string;
}

export interface IFilter {
    isFinished?: boolean;
    isNotFinished?: boolean;
}