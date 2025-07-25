import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  useEffect(() => {
    document.body.classList.add('register-body');
    return () => {
      document.body.classList.remove('register-body');
    };
  }, []);

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <form method="POST" action="http://localhost:3000/register">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="Your full name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="you@example.com" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Create a password" required />
        <Link to={'/login'}>
        <button type="submit">Register</button></Link>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
