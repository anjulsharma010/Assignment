// src/Dashboard.js
import React, { useContext } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  let { user, setUser } = useContext(UserContext);
  console.log(user)
  if (user == null){
    user = JSON.parse(localStorage.getItem('user'))
  }
  console.log(user, localStorage.getItem('user'))
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Welcome, {user.name}!
      </h2>
      <p
        style={{
          fontSize: "16px",
          margin: "10px 0",
          color: "#555",
        }}
      >
        Email: <strong>{user.email}</strong>
      </p>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 15px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
      >
        Logout
      </button>
      <button
        onClick={()=>{navigate("/user-details")}}
        style={{
            marginLeft: "10px",
          padding: "10px 15px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
      >
        User Details
      </button>
    </div>
  );
};

export default Dashboard;
