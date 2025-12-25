import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "./features/apiSlice";

function Signup() {

    const navigate = useNavigate();

    const [signup, { isLoading, isSuccess, error }] = useSignupMutation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

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

        try {
            await signup(formData).unwrap();
        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/login");
        }
    }, [isSuccess, navigate]);

    return (
        <div style={styles.container}>
            <h2>Signup Form</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />

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
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />

                <button type="submit" disabled={isLoading} style={styles.btn}>{isLoading ? 'Signing up...' : 'Signup'}</button>

                <button type="button" onClick={() => navigate('/login')} style={styles.lbtn}>Already have an Account? Login </button>
            </form>

            {error && (
                <p style={{ color: "red" }}>
                    {error.data?.message || "Signup failed"}
                </p>
            )}

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
