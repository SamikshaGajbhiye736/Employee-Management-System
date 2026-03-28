import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password || !role) {
      alert("All fields required");
      return;
    }

    const response = await fetch("http://localhost:8082/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    });

    const data = await response.json();
    console.log(data);

    if (data.message === "Login Successful") {
      localStorage.setItem("id", data.id);       // ✅ IMPORTANT
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name); // ✅ store employee name
      localStorage.setItem("email", data.email); // store employee email

      if (data.role === "ADMIN") {
  navigate("/admin-dashboard", { state: { loginSuccess: true } });
} else if (data.role === "EMPLOYEE") {
  navigate("/employee-dashboard", { state: { loginSuccess: true } });
}
    } else {
      alert(data.message);
    }
  };

  const containerStyle = {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  };

  // Left image: full width of left half
  const leftStyle = {
    flex: 1,
    backgroundImage: "url('/login-5.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    position: "relative", // important for overlay
    transition: "0.5s"
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // black overlay with 50% opacity
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
    width: "80px",        // adjust size as needed
    height: "80px",
    objectFit: "contain",
    marginBottom: "0px" ,  // space between logo and title
    // marginLeft:"100px"
  };

  const rightStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
    padding: "40px"
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
    animation: "slideIn 0.8s ease"
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
    backgroundColor: "#5563DE",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  };





  return (
    <div style={containerStyle}>
      {/* Left Image */}
      <div style={leftStyle}>
        <div style={overlayStyle}>
          <div style={overlayTextStyle}>
         <div>
             <img
              src="/logo-removebg-preview.png" // put your logo file in public folder
              alt="Logo"
              style={overlayLogoStyle}
            />
         </div>
            Employee Management System<br />

          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div style={rightStyle}>
        <div style={cardStyle}>
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Login Page</h2>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
          // onFocus={(e) => e.target.style = inputStyle}
          // onBlur={(e) => e.target.style = inputStyle}
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="EMPLOYEE">Employee</option>
          </select>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          // onFocus={(e) => e.target.style = inputStyle}
          // onBlur={(e) => e.target.style = inputStyle}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          // onFocus={(e) => e.target.style = inputStyle}
          // onBlur={(e) => e.target.style = inputStyle}
          />

          <button
            onClick={handleLogin}
            style={buttonStyle}
          // onMouseEnter={(e) => e.currentTarget.style = {...buttonStyle, ...buttonHover}}
          // onMouseLeave={(e) => e.currentTarget.style = buttonStyle}
          >
            Login
          </button>

          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Don't have an account?{" "}
            <span
              style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/register")}
            >
              Register
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

export default Login;