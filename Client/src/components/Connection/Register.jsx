import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';
import styles from './register.module.css';

const Register = () => {
  const [NextRegistration, setNextRegistration] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleInitialRegister = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios.get(`http://localhost:3000/users/username/${username}`);
      // אם הצליח – המשתמש כבר קיים
      setError('Username already exists.');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // המשתמש לא קיים – אפשר להמשיך לרישום
        setNextRegistration(false);
        setError('');
      } else {
        // שגיאה אמיתית בשרת
        setError('An error occurred. Please try again.');
      }
    }
  };
    
  const handleCompleteRegistration = async (e) => {
      e.preventDefault();
      try {
        // שלב 1: יצירת משתמש בסיסי (userName + password)
        const newUser = {
          userName: username,
          password: password
        };

        const response = await axios.post('http://localhost:3000/users/', newUser);
        const userId = response.data.userId;

        // שלב 2: עדכון פרטים נוספים (name, email, phone)
        const userDetailsUpdate = {
          name: userDetails.fullName,
          email: userDetails.email,
          phone: userDetails.phone
        };

        await axios.put(`http://localhost:3000/users/${userId}`, userDetailsUpdate);

        // התחברות ושמירה בקונטקסט
        const user = {
          id: userId,
          username: username,
          email: userDetails.email
        };

        login(user);
        navigate('/home');
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };
  
  return (
    <div className={styles.container}>
      <h2>Register</h2>
      {NextRegistration ? (
        <form onSubmit={handleInitialRegister} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Register</button>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.linkContainer}>
            <Link to="/login">Login</Link>
          </div>
        </form>
      ) : (
        <form onSubmit={handleCompleteRegistration} className={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={userDetails.fullName}
            onChange={(e) =>
              setUserDetails((prevDetails) => ({
                ...prevDetails,
                fullName: e.target.value,
              }))
            }
            required
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails((prevDetails) => ({
                ...prevDetails,
                email: e.target.value,
              }))
            }
            required
            className={styles.input}
          />
          <input
            type="phone"
            placeholder="Phone"
            value={userDetails.phone}
            onChange={(e) =>
              setUserDetails((prevDetails) => ({
                ...prevDetails,
                phone: e.target.value,
              }))
            }
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Complete Registration</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Register;
