import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashbord";
import OTPVerification from "./components/OTPVerfication";  // ✅ Import OTP Page
import { AuthProvider } from "./context/AuthContext";

import Register from "./components/Register";


function App() {
    return (
        
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/otp-verification" element={<OTPVerification />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        
    );
}

export default App;

