import React, { useState } from 'react';
import '../styles/Form.css';
import { Link } from 'react-router-dom';
import { registerUser } from '../LocalStorage/localStorage';

const Register = () => {
    const [ formData, setFormData ] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { username, email, password, confirmPassword } = formData;

    const changeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const submitHandler = e => {
        e.preventDefault();
        password === confirmPassword ? alert(registerUser({ username, email, password, todoListing: [] })) : alert('Passwords should be same');
        setFormData({...formData, username: '', email: '', password: '', confirmPassword: ''});
    }

    return (
        <div className='form-page'>
            <form className='form-container' onSubmit={submitHandler}>
                <h1>REGISTER</h1>
                <div className='form-item'>
                    <label>Username:</label>
                    <input type='text' name='username' value={username} placeholder='Enter a username...' onChange={changeHandler} required />
                </div>
                <div className='form-item'>
                    <label>Email:</label>
                    <input type='email' name='email' value={email} placeholder='Enter an email...' onChange={changeHandler} required />
                </div>
                <div className='form-item'>
                    <label>Password:</label>
                    <input type='password' name='password' value={password} placeholder='Enter a password...' onChange={changeHandler} minLength={7} />
                </div>
                <div className='form-item'>
                    <label>Confirm:</label>
                    <input type='password' name='confirmPassword' value={confirmPassword} placeholder='Confirm password...' onChange={changeHandler} minLength={7} />
                </div>
                <input type="submit" value="Register" />
                <p>Already have an account? <Link to="/login">Log In</Link></p>
            </form>
        </div>
    )
}

export default Register