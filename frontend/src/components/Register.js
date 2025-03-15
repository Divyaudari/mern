import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        isMFAEnabled: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", formData);
            alert(response.data.message);
            navigate("/login"); // Redirect to Login Page after successful registration
        } catch (error) {
            alert(error.response.data.message || "Registration failed");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <label>
                    <input type="checkbox" name="isMFAEnabled" checked={formData.isMFAEnabled} onChange={(e) => setFormData({ ...formData, isMFAEnabled: e.target.checked })} />
                    Enable MFA
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
