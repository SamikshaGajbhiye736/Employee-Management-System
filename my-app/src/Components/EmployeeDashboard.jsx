import React from "react";
import EmployeeSidebar from "./EmployeeSidebar";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, BarChart, Bar
} from "recharts";

function EmployeeDashboard() {

  // Dummy Data
  const taskData = [
    { name: "Mon", tasks: 2 },
    { name: "Tue", tasks: 4 },
    { name: "Wed", tasks: 3 },
    { name: "Thu", tasks: 5 },
    { name: "Fri", tasks: 4 }
  ];

  const attendanceData = [
    { name: "Week 1", attendance: 90 },
    { name: "Week 2", attendance: 95 },
    { name: "Week 3", attendance: 92 },
    { name: "Week 4", attendance: 97 }
  ];

  const layout = {
    display: "flex",
    minHeight: "100vh",
    background: "#eef2f7",
    fontFamily: "Segoe UI"
  };

  const main = {
    flex: 1,
    padding: "25px",
    marginLeft: "290px"
  };

  const topbar = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "15px 20px",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
    marginBottom: "25px"
  };

  const rightSection = {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  };

  const iconBox = {
    padding: "8px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "0.3s"
  };

  const profile = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: "500"
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  };

  const card = {
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
    cursor: "pointer"
  };

  const hover = (e) => e.currentTarget.style.transform = "translateY(-8px)";
  const out = (e) => e.currentTarget.style.transform = "translateY(0)";
  const name = localStorage.getItem("name");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const chartBox = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.05)"
  };

  return (
    <div style={layout}>

      {/* Sidebar */}
      <EmployeeSidebar />

      {/* Main */}
      <div style={main}>

        {/* Topbar */}
        <div style={topbar}>
          <h3>Welcome {name || "Employee"} !</h3>

          <div style={rightSection}>
            <div
              style={iconBox}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f0f0f0"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <FaBell />
            </div>

            <div
  ref={dropdownRef}
  style={{ ...profile, position: "relative", cursor: "pointer" }}
  onClick={() => setOpen(!open)}
>
  <FaUserCircle size={26} />
  <span>{name || "Employee"}</span>

  {open && (
    <div style={{
      position: "absolute",
      top: "40px",
      right: "0",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      padding: "10px",
      width: "140px",
      zIndex: 100
    }}>
      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          padding: "8px",
          border: "none",
          background: "none",
          cursor: "pointer",
          textAlign: "left",
          borderRadius: "6px",
          color: "#e74c3c",
          fontWeight: "500",
          fontSize:"17px"
        }}
        onMouseEnter={(e) => e.target.style.background = "#f5f5f5"}
        onMouseLeave={(e) => e.target.style.background = "transparent"}
      >
        Logout
      </button>
    </div>
  )}
</div>
          </div>
        </div>

        {/* Cards */}
        <div style={grid}>
          <div style={card} onMouseEnter={hover} onMouseLeave={out}>
            <h4>Total Tasks</h4>
            <h2>12</h2>
          </div>

          <div style={card} onMouseEnter={hover} onMouseLeave={out}>
            <h4>Completed</h4>
            <h2>8</h2>
          </div>

          <div style={card} onMouseEnter={hover} onMouseLeave={out}>
            <h4>Pending</h4>
            <h2>4</h2>
          </div>

          <div style={card} onMouseEnter={hover} onMouseLeave={out}>
            <h4>Attendance</h4>
            <h2>95%</h2>
          </div>
        </div>

        {/* Charts */}
        <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

          <div style={chartBox}>
            <h4>Weekly Tasks</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={taskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tasks" stroke="#4f46e5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={chartBox}>
            <h4>Attendance Overview</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#6366f1" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Activity */}
        <div style={{
          marginTop: "30px",
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.05)"
        }}>
          <h3>Recent Activity</h3>
          <ul style={{ lineHeight: "2" }}>
            <li>✔ Task completed</li>
            <li>📌 New task assigned</li>
            <li>🕒 Attendance marked</li>
            <li>✏ Profile updated</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default EmployeeDashboard;