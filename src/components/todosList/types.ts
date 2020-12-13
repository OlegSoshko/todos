export interface ITodos {
    items: ITodo[];
    total: number;
}

export interface ITodo {
    createdAt: string;
    description: string;
    id: string;
    isFinished: boolean;
    title: string;
}

export interface IResponseDeleteTodo {
    status: string;
    message: string;
}