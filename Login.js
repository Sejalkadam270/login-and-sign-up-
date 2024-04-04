import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogin = async () => {
    console.warn(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    result = await result.json();
    console.warn(result);
    if (result.auth) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', JSON.stringify(result.auth));
      navigate('/');
    } else {
      alert("Please enter correct information");
    }
  }

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-title">
            <h1>Login</h1>
          </div>
          <div className="form">
            <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="form-control" />
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" />
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
            <Link to="/signup" className="btn btn-link">Create Account</Link><br />
            <Link to="/reset" className="btn btn-link">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
