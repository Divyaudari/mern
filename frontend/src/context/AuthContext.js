import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  // Function to handle login
  const login = async (email, password, navigate) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
  
      console.log("Login Success:", res.data);
  
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        setUser({ token: res.data.token });
  
        // ✅ Redirect to OTP Verification instead of Dashboard
        navigate("/otp-verification");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
    }
  };
  
  

  // Function to verify OTP
  const verifyOTP = async (otp, navigate) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email: user.email, otp });
      if (res.data.success) {
        setUser({ ...user, isVerified: true });
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("OTP Verification failed:", err.response?.data?.message || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, otpSent, verifyOTP }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
