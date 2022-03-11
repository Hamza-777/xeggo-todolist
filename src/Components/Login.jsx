import React, { useState } from 'react';
import '../styles/Form.css';
import { Link, Navigate } from 'react-router-dom';
import { loginUser, setAuthorization, checkAuth } from '../LocalStorage/localStorage';

const Login = () => {
  const [ formData, setFormData ] = useState({ email: '', password: '' });
  const [ auth, setAuth ] = useState(null);

  const { email, password } = formData;

  const changeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = e => {
    e.preventDefault();
    setAuthorization(loginUser({ email, password }));
    setFormData({ ...formData, email: '', password: '' });
    setAuth(checkAuth());
  }

  if(auth) {
    console.log(auth);
    return <Navigate to="/todo" />
  }

  return (
    <div className='form-page'>
        <form className='form-container' onSubmit={submitHandler}>
            <h1>LOGIN</h1>
            <div className='form-item'>
                <label>Email:</label>
                <input type='email' name="email" value={email} placeholder='Enter an email...' onChange={changeHandler} />
            </div>
            <div className='form-item'>
                <label>Password:</label>
                <input type='password' name="password" value={password} placeholder='Enter a password...' onChange={changeHandler} />
            </div>
            <input type="submit" value="Login" />
            <p>Don't have an account? <Link to="/">Register</Link></p>
        </form>
    </div>
  )
}

export default Login;