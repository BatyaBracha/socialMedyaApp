import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';
import styles from './register.module.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

const handleLogin = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post(`http://localhost:3000/users/login`, {
      userName: username,
      password
    });

    const user = {
      username: response.data.user_name,
      id: response.data.user_id,
      email: response.data.email
    };
    login(user);
    navigate('/home');
  } catch (err) {
    setError('Username or password is incorrect.');
  }
};

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        className={styles.input}
      />
      <input 
        type="password" 
        placeholder="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className={styles.input} 
      />
      <button type="submit" className={styles.button}>Login</button>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.linkContainer}>
        <Link to="/register">register</Link>  
      </div>
      </form>
    </div>
  );
};

export default Login;
