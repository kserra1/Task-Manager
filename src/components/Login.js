import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import httpClient from '../httpClient';
import { setCookie } from '../actions/cookieActions';
import { connect } from 'react-redux';
const Login = ( ) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [loginError, setLoginError] = useState('');
    const [registrationError, setRegistrationError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await httpClient.post('http://127.0.0.1:5000/api/login', {
                username,
                password,
            }, {
                withCredentials: true, // Include credentials
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;

            if (response.status === 200) {
                console.log(document.cookie, 'cookie')
                const access_token = data.access_token;
                setCookie({ key: 'value' });
                sessionStorage.setItem('access_token', access_token);
                console.log('Login successful');
                setLoginError('');
                navigate('/tasks');
            } else {
                setLoginError("Invalid username or password");
                console.error('Login failed:', data.error);
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setLoginError("An error occurred.");
            setUsername('');
            setPassword('');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await httpClient.post('http://127.0.0.1:5000/create_user', {
                username: newUsername,
                password: newPassword,
            }, {
                withCredentials: true, // Include credentials
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Registration successful');
                setRegistrationError('');
            } else {
                const data = response.data;
                console.error('Registration failed:', data.error);
                setRegistrationError("Registration failed. Please try again");
                setNewUsername('');
                setNewPassword('');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setRegistrationError("An error occurred. Make sure you are using a unique username.");
            setNewUsername('');
            setNewPassword('');
        }
    };

    return (
        <div>
            <h1 className="centered-text">Task Manager</h1>

            <div className="container">
                <div className="login-form">
                    <h2>Login</h2>
                    {loginError && <p className="error-message">{loginError}</p>}
                    <form>
                        <label>
                            Username:
                            <input
                                type="text"
                                value={username}
                                placeholder='Username'
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setLoginError('');
                                }}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                placeholder='Password'
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setLoginError('');
                                }}
                            />
                        </label>
                        <button type="button" onClick={handleLogin}>
                            Login
                        </button>
                    </form>
                </div>
            </div>

            <div className="register-form">
                <h2>Register</h2>
                {registrationError && <p className="error-message">{registrationError}</p>}
                <form>
                    <label>
                        New Username:
                        <input
                            type="text"
                            value={newUsername}
                            placeholder='Username'
                            onChange={(e) => {
                                setNewUsername(e.target.value);
                                setRegistrationError('');
                            }}
                        />
                    </label>
                    <label>
                        New Password:
                        <input
                            type="password"
                            value={newPassword}
                            placeholder='Password'
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setRegistrationError('');
                            }}
                        />
                    </label>
                    <button type="button" onClick={handleRegister}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};


const mapDispatchToProps =(dispatch)=> {
    return {
        setCookie: (cookieData) => dispatch(setCookie(cookieData)),
    };
};

export default connect(null, mapDispatchToProps)(Login);