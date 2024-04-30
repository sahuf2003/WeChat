import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../service/firebase/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import UserModel from '../models/userModel';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser;
      if (user) {
        const userData = { ...UserModel };
        userData.email = user.email;
        userData.name = name;
        userData.id = user.uid;
        userData.searching = false;
        userData.online = false;
        await setDoc(doc(db, 'users', user.uid), userData);
      }
      console.log(user);
      console.log("User Registered Successfully");
      toast.success("User Registered Successfully!", {
        position: "top-center"
      });

    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center"
      })
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
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
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUp;
