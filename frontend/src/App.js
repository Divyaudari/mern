import React, { useState } from "react";
import axios from "axios";

const App = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [requiresOTP, setRequiresOTP] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

            if (res.data.requiresOTP) {
                setRequiresOTP(true);
                setMessage("OTP sent to your email. Please verify.");
            } else {
                setMessage("Login successful!");
            }
        } catch (error) {
            setMessage("Login failed");
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });

            setMessage("OTP verified. Login successful!");
            setRequiresOTP(false);
        } catch (error) {
            setMessage("OTP verification failed");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Login</h2>
            {!requiresOTP ? (
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <br /><br />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <br /><br />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOTP}>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    <br /><br />
                    <button type="submit">Verify OTP</button>
                </form>
            )}
            <p>{message}</p>
        </div>
    );
};

export default App;
