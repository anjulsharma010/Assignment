// src/UserDetails.js
import React, { useContext } from "react";
import UserContext from "./UserContext";

const UserDetails = () => {
  const { user } = useContext(UserContext);

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
        textAlign: "left",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#333",
          textAlign: "center",
        }}
      >
        User Details
      </h2>
      <p
        style={{
          fontSize: "16px",
          margin: "10px 0",
          color: "#555",
        }}
      >
        <strong>Name:</strong> {user.name}
      </p>
      <p
        style={{
          fontSize: "16px",
          margin: "10px 0",
          color: "#555",
        }}
      >
        <strong>Email:</strong> {user.email}
      </p>
      
    </div>
  );
};

export default UserDetails;
