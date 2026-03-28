import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "EMPLOYEE" // ✅ fixed role
        })
      });

      const data = await response.text();
      alert(data);
      navigate("/"); // go back to login
    } catch (error) {
      console.log(error);
      alert("Error registering user");
    }
  };

  // Layout styles
  const containerStyle = {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  };

  const leftStyle = {
    flex: 1,
    backgroundImage: "url('/login-5.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    position: "relative",
    transition: "0.5s",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  };

  const overlayTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    textAlign: "center",
    fontSize: "33px",
    fontWeight: "bold",
    padding: "0 20px",
    lineHeight: "1.3",
  };

  const overlayLogoStyle = {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    // marginBottom: "20px",
  };

  const rightStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
    padding: "40px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    animation: "slideIn 0.8s ease",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    transition: "0.3s",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div style={containerStyle}>
      {/* Left Image */}
      <div style={leftStyle}>
        <div style={overlayStyle}></div>
        <div style={overlayTextStyle}>
         <div>
           <img
            src="/logo-removebg-preview.png" // put your logo file in public folder
            alt="Logo"
            style={overlayLogoStyle}
          />
         </div>
          Employee Management System
         
         
        </div>
      </div>

      {/* Right Register Form */}
      <div style={rightStyle}>
        <div style={cardStyle}>
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Employee Register</h2>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button onClick={handleRegister} style={buttonStyle}>
            Register
          </button>

          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          @media (max-width: 768px) {
            div[style*="flex: 1"]:first-child { display: none; }
            div[style*="flex: 1"]:nth-child(2) { flex: 1 1 100%; }
          }
        `}
      </style>
    </div>
  );
}

export default Register;