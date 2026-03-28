import React, { useEffect, useState } from "react";
import EmployeeSidebar from "./EmployeeSidebar";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

function EmployeeProfile() {

  const [employee, setEmployee] = useState({});

useEffect(() => {
  const email = localStorage.getItem("email");
  console.log("Email:", email);

  fetch(`http://localhost:8082/employees/email/${email}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Employee not found");
      }
      return res.text(); // 👈 first get text
    })
    .then(text => {
      if (!text) {
        console.log("Empty response from backend");
        return;
      }
      const data = JSON.parse(text);
      setEmployee(data);
    })
    .catch(err => console.log(err));
}, []);



  // Layout
  const layout = {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f7fb",
    fontFamily: "Arial"
  };

  const main = {
    flex: 1,
    padding: "30px",
    marginLeft: "290px"
  };

  // Header
  const header = {
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    padding: "30px",
    borderRadius: "15px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
  };

  const avatar = {
    fontSize: "60px",
    background: "rgba(255,255,255,0.2)",
    padding: "15px",
    borderRadius: "50%"
  };

  // Sections
  const section = {
    marginTop: "25px",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "15px"
  };

  const item = {
    padding: "12px",
    borderRadius: "8px",
    background: "#f9fafc",
    transition: "0.3s",
    cursor: "pointer"
  };

  const hover = (e) => {
    e.currentTarget.style.background = "#eef2ff";
    e.currentTarget.style.transform = "translateY(-3px)";
  };

  const out = (e) => {
    e.currentTarget.style.background = "#f9fafc";
    e.currentTarget.style.transform = "translateY(0)";
  };

  const label = {
    fontSize: "13px",
    color: "#888"
  };

  const value = {
    fontWeight: "bold",
    marginTop: "3px"
  };

  return (
    <div style={layout}>

      <EmployeeSidebar />

      <div style={main}>

        {/* 🔥 TOP PROFILE */}
        <div style={header}>
          <div style={avatar}>
            <FaUserCircle />
          </div>

          <div>
            <h2>{employee.name}</h2>
            <div>{employee.designation} • {employee.department}</div>
            <div style={{ marginTop: "5px", fontSize: "14px" }}>
              Status: {employee.status}
            </div>
          </div>
        </div>

        {/* 🔥 PERSONAL INFO */}
        <div style={section}>
          <h3>Personal Information</h3>

          <div style={grid}>

            <div style={item} onMouseEnter={hover} onMouseLeave={out}>
              <div style={label}>Email</div>
              <div style={value}>{employee.email}</div>
            </div>

            <div style={item} onMouseEnter={hover} onMouseLeave={out}>
              <div style={label}>Phone</div>
              <div style={value}>{employee.phone}</div>
            </div>

            <div style={item} onMouseEnter={hover} onMouseLeave={out}>
              <div style={label}>Address</div>
              <div style={value}>{employee.address}</div>
            </div>

          </div>
        </div>

        {/* 🔥 WORK INFO */}
        <div style={section}>
          <h3>Work Details</h3>

          <div style={grid}>

            <div style={item} onMouseEnter={hover} onMouseLeave={out}>
              <div style={label}>Department</div>
              <div style={value}>{employee.department}</div>
            </div>

            <div style={item} onMouseEnter={hover} onMouseLeave={out}>
              <div style={label}>Designation</div>
              <div style={value}>{employee.designation}</div>
            </div>

            <div style={item} onMouseEnter={hover} onMouseLeave={out}>
              <div style={label}>Salary</div>
              <div style={value}>₹ {employee.salary}</div>
            </div>

            <div style={item} onMouseEnter={hover} onMouseLeave={out}>
              <div style={label}>Joining Date</div>
              <div style={value}>{employee.joiningDate}</div>
            </div>

          </div>
        </div>

        {/* 🔥 SKILLS */}
        <div style={section}>
          <h3>Skills</h3>

          <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {employee.skills && employee.skills.split(",").map((skill, index) => (
              <span key={index} style={{
                background: "#4f46e5",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "13px"
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default EmployeeProfile;