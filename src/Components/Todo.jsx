import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { getTodos, addTodo, deleteTodo } from '../actions/todo';
import '../styles/Todo.css';

const Todo = ({ getTodos, addTodo, deleteTodo, todo: { todos } }) => {
    const [ logout, setLogout ] = useState(null);
    const [ input, setInput ] = useState('');
    const email = JSON.parse(localStorage.getItem('authorization'))[1];

    useEffect(() => {
        getTodos(email);
    }, [getTodos, email]);
    

    const clickHandler = () => {
        setLogout(true);
    }

    const changeHandler = e => {
        setInput(e.target.value);
    }

    const addNewTodo = e => {
        const id = v4();
        input ? addTodo({ input, id }, email): alert('Please write something in the input field');
        setInput('');
    }

    const deleteIt = e => {
        deleteTodo(e.target.parentElement.id, email);
    }

    if(logout) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <nav className='navbar'>
                <h2>The TODO</h2>
                <button onClick={clickHandler}>LOGOUT</button>
            </nav>
            <div className='todo-container'>
                <div className='add-item'>
                    <input type="text" value={input} placeholder='Add a todo...' onChange={changeHandler} />
                    <button onClick={addNewTodo}>Add Item</button>
                </div>
                <div className='todos'>
                    {
                        todos && todos.map(todo => (
                            <div key={todo.id} id={todo.id} className='todo'>
                                <p>{todo.input}</p> <i className="fa-solid fa-trash-can" onClick={deleteIt}></i>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    todo: state.todo
})

export default connect(mapStateToProps, { getTodos, addTodo, deleteTodo })(Todo);