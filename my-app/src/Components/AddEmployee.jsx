// AddEmployee.jsx
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './AddEmployee.css';

// toast.configure();

function AddEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    status: "Active",
    joiningDate: "",
    address: "",
    skills: ""
  });

  const handleChange = (e) => setEmployee({ ...employee, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8082/employees/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee)
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Employee Added Successfully!");
        setEmployee({
          name: "",
          email: "",
          phone: "",
          department: "",
          designation: "",
          salary: "",
          status: "Active",
          joiningDate: "",
          address: "",
          skills: ""
        });
      })
      .catch(() => toast.error("Failed to add employee"));
  };

  return (
    <div className="layout">
      <AdminSidebar />
      <div className="content">
        <h2 className="page-title">Add New Employee</h2>
        <div className="form-card-simple">
          <form className="full-form" onSubmit={handleSubmit}>

            {/* Left Column */}
            <div className="form-column">
              {["name", "email", "phone", "department", "designation"].map((key) => (
                <div className="input-group" key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    name={key}
                    value={employee[key]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="form-column">
              {["salary", "status", "joiningDate", "address", "skills"].map((key) => (
                <div className="input-group" key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  {key === "status" ? (
                    <select name={key} value={employee[key]} onChange={handleChange}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  ) : key === "address" ? (
                    <textarea name={key} value={employee[key]} onChange={handleChange}></textarea>
                  ) : key === "joiningDate" ? (
                    <input type="date" name={key} value={employee[key]} onChange={handleChange} />
                  ) : (
                    <input type={key === "salary" ? "number" : "text"} name={key} value={employee[key]} onChange={handleChange} />
                  )}
                </div>
              ))}
            </div>

            <button type="submit" className="submit-btn">Add Employee</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;