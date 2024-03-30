


import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import API_URL from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleApi = () => {
        setError('');
        setLoading(true);

        // Basic input validation
        if (!identifier || !password) {
            setError('Please enter both email and password.');
            setLoading(false);
            return;
        }

        const url = API_URL + '/login';
        const data = { identifier, password };
axios.post(url, data)
    .then((res) => {
        console.log(res);
        const { message, token, role } = res.data;
        if (message && token && role) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('userName', res.data.username);
            if (role === 'USER') {
                navigate("/");
            } else if (role === 'ADMIN') {
                navigate("/admin");
            } else {
                setError('Unknown role');
            }
        } else {
            setError('Invalid credentials or role not provided');
        }
    })
    .catch((err) => {
        console.error('Server error:', err);
        setError('Server error. Please try again.');
    })
    .finally(() => {
        setLoading(false);
    });
}
    return (
        <center>
            <div className="flex justify-center items-center h-screen">
                <div>
                    <Header />
                    <div className="p-3 m-3">{/*
                        <h3 className="text-lg font-semibold">Welcome to Login Page</h3>*/}
                        <div className="mt-4">
                            <label htmlFor="identifier" className="block text-sm mb-1">EMAIL</label>
                            <input
                                id="identifier"
                                className="form-control"
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm mb-1">PASSWORD</label>
                            <input
                                id="password"
                                className="form-control"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <div className="text-red-500 mt-2">{error}</div>}
                        <button className="btn mt-4 btn-primary" onClick={handleApi} disabled={loading}>
                            {loading ? 'Logging in...' : 'LOGIN'}
                        </button>
                        <Link className="btn btn-secondary mt-2" to="/signup">SIGNUP</Link>
                        <ToastContainer position="bottom-left" />
                    </div>
                </div>
            </div>
        </center>
    );
}

export default Login;
