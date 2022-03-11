import { GET_TODOS, ADD_TODO, DELETE_TODO } from "./types";
import { getTodosByEmail, updateUser } from "../LocalStorage/localStorage";

export const getTodos = email => dispatch => {
    const todos = getTodosByEmail(email);

    dispatch({
        type: GET_TODOS,
        payload: todos
    });
}

export const addTodo = (todo, email) => dispatch => {
    updateUser(email, todo, 'add');
    
    dispatch({
        type: ADD_TODO,
        payload: todo
    });
}

export const deleteTodo = (id, email) => dispatch => {
    updateUser(email, id, 'delete');

    dispatch({
        type: DELETE_TODO,
        payload: id
    });
}