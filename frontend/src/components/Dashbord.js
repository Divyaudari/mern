import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || !user.isVerified) {
    return <h3>Access Denied. Please login.</h3>;
  }

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <p>Email: {user.email}</p>
      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
};

export default Dashboard;
