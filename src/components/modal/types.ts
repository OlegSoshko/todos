import { ITodo } from '../../types/global';
export interface IModalAddTodoProps {
    show: boolean;
    todo?: ITodo;
    handleClose: () => void;
    handleSave: (newTodo: any) => void;
}
export interface IModalDeleteTodo {
    id: string;
    title: string;
    show: boolean;
    handleClose: () => void;
    handleOk: () => void;
}