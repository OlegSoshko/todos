export interface IPanelTodoProps {
    handleShowModalAddTodos: () => void;
    changeFinishedFilter: () => void;
    changeNotFinishedFilter: () => void;
    filter: any;
}