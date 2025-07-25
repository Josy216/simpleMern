import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form method="POST" action="http://localhost:3000/login">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password"
          required
        />
        <Link to={'/home'}>
        <button type="submit">Log In</button></Link>
      </form>

      <p className="register-link">
        Don’t have an account? <Link to="/">Register</Link>
      </p>
    </div>
  );
}

export default Login;
