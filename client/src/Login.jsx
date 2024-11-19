import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const navigate = useNavigate()

    const handeleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://mern-signup-api.vercel.app/login', {email,password})
        .then(result => {
          console.log(result)
          if(result.data === "Success") {
            navigate('/home')
          }
        
        })
        .catch(err=> console.log(err))
  }
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#f0f0f0' }}
    >
      <div className="card p-4" style={{ width: '300px', borderRadius: '10px' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handeleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
          </form>

          {/* Already Have an Account */}
          <div className="text-center mt-3">
            <small>Already Have an Account?</small>
            <br />
            <Link to= "/login" type="button" className="btn btn-link">
              Signup
            </Link>
          </div>
        
      </div>
    </div>
  );
};

export default Login;
