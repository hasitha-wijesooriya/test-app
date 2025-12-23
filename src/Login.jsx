import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { loginUser,clearStatus } from "./features/auth/authSlice";

function Signup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, success, token } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    // input change handler
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    useEffect(() => {
        if (token) {
            navigate('/home');
            dispatch(clearStatus());
        }
    }, [token, navigate, dispatch]);

    return (
        <div style={styles.container}>
            <h2>Login Form</h2>

            <form onSubmit={handleSubmit} style={styles.form}>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    // value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />

                <button type="submit" disabled={loading} style={styles.btn}>{loading ? 'Logging in...' : 'Login'}</button>

                <button type="button" onClick={() => navigate('/signup')} style={styles.lbtn}>Don't have an Account? Signup </button>

            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

        </div>
    );
}

// simple CSS styles
const styles = {
    container: {
        width: "350px",
        margin: "60px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    input: {
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #aaa"
    },
    btn: {
        padding: "10px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    },

    lbtn: {
        padding: "10px",
        background: "#70660cff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    }
};

export default Signup;
