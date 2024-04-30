import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import app, { auth, db } from '../service/firebase/firebaseConfig';
import UserModel from '../models/userModel';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User Logged In successfully');
      toast.success('User logged in Success', { position: 'top-center' });
  
      const user = auth.currentUser;
      // Update only the online field of the user document
      await updateDoc(doc(db, 'users', user.uid), {
        online: true
      });
  
      window.location.href = '/profile';
  
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: 'bottom-center'
      });
    }
  }
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email"
          value={email}
          placeholder='Enter Email'
          onChange={(e) => setEmail(e.target.value)}

        />
        <label htmlFor="password">Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle-button"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default Login;
