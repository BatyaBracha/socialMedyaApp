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
      const response = await axios.get(`http://localhost:3000/users?username=${username}`);
      if (response.data[0].website === password&&response.data[0].username === username)
      {
        const user = { username, id: response.data[0].id,email:response.data[0].email };
        login(user);
        navigate('/home');
      } else {
        setError('Username or password is incorrect.');
      }
    } catch (err) {
      setError('You are not registered, please register.');
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
