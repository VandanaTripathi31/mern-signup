import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setemail] = useState(""); // Initialize state with empty string
    const [password, setpassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // For error messages
    const navigate = useNavigate();

    const handeleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setErrorMessage("Both fields are required");
            return;
        }

        axios.post('https://mern-signup-api.vercel.app/login', { email, password })
            .then((result) => {
                console.log(result);
                if (result.data === "Success") {
                    navigate('/home');
                } else {
                    setErrorMessage(result.data); // Set error message from server
                }
            })
            .catch((err) => {
                console.error(err);
                setErrorMessage("An error occurred. Please try again later.");
            });
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: '#f0f0f0' }}
        >
            <div className="card p-4" style={{ width: '300px', borderRadius: '10px' }}>
                <h3 className="text-center mb-4">Login</h3>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
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
                            value={email}
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
                            value={password}
                        />
                    </div>

                    {/* Register Button */}
                    <button type="submit" className="btn btn-success w-100">
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <div className="text-center mt-3">
                    <small>Don't have an account?</small>
                    <br />
                    <Link to="/signup" type="button" className="btn btn-link">
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
