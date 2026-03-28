import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";

function Employee() {

  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [editEmp, setEditEmp] = useState(null);

  // Fetch Employees
  const fetchEmployees = () => {
    fetch("http://localhost:8082/employees/all")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete
  const handleDelete = (id) => {
    fetch(`http://localhost:8082/employees/delete/${id}`, {
      method: "DELETE"
    }).then(() => fetchEmployees());
  };

  // Update
  const handleUpdate = () => {
    fetch(`http://localhost:8082/employees/update/${editEmp.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editEmp)
    }).then(() => {
      setEditEmp(null);
      fetchEmployees();
    });
  };

  // 🎨 STYLES
  const layout = {
    display: "flex",
    height: "100vh",
    background: "#f4f6f9",
    fontFamily:"'Roboto', sans-serif"
  };

  const content = {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
    marginLeft: "290px",   // ✅ SAME as sidebar width
    padding: "30px",
    width: "100%",
    background: "#f4f6f9",
    minHeight: "100vh"
  };

  const table = {
    width: "100%",
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  };

  const th = {
    background: "#1f768f",
    color: "#fff",
    padding: "12px"
  };

  const td = {
    padding: "12px",
    textAlign: "center",
    borderBottom: "1px solid #eee",
    fontWeight:"500",
    fontFamily:"'Poppins', 'Segoe UI', 'Arial', sans-serif"
  };

  const btn = {
    padding: "6px 12px",
    margin: "2px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s"
  };

  const modalOverlay = {
    position: "fixed",
    top: 0,
    left: "250px",   // ✅ start AFTER sidebar
    width: "calc(100% - 250px)",  // ✅ avoid sidebar area
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  };

  const modal = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px"
  };

  const input = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  };

  const modernModal = {
    background: "#fff",
    padding: "35px",
    paddingRight:"30px",
    borderRadius: "12px",
    width: "700px",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease"
  };

  const formGrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
  };

  const inputGroup = {
    display: "flex",
    flexDirection: "column",
    marginLeft:"10px"
  };

  const label = {
    fontSize: "14px",
    marginBottom: "5px",
    color: "#555"
  };

  const btnContainer = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px"
  };

  return (
    <div style={layout}>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div style={content}>
        <h2 style={{ marginBottom: "20px" }}>Employees</h2>

        <table style={table}>
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Department</th>
              <th style={th}>Designation</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td style={td}>{emp.id}</td>
                <td style={td}>{emp.name}</td>
                <td style={td}>{emp.email}</td>
                <td style={td}>{emp.department}</td>
                <td style={td}>{emp.designation}</td>
                <td style={td}>

                  <button
                    style={{ ...btn, background: "#3498db", color: "#fff" }}
                    onClick={() => setSelectedEmp(emp)}
                  >
                    View
                  </button>

                  <button
                    style={{ ...btn, background: "#2ecc71", color: "#fff" }}
                    onClick={() => setEditEmp(emp)}
                  >
                    Edit
                  </button>

                  <button
                    style={{ ...btn, background: "red", color: "#fff" }}
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {selectedEmp && (
        <div style={modalOverlay} onClick={() => setSelectedEmp(null)}>
          <div style={modal} onClick={e => e.stopPropagation()}>
            <h3>Employee Details</h3>

            {Object.entries(selectedEmp).map(([key, value]) => (
              <p key={key}>
                <b>{key}:</b> {value ? value.toString() : "N/A"}
              </p>
            ))}

            <button
              style={{ ...btn, background: "#333", color: "#fff", width: "100%" }}
              onClick={() => setSelectedEmp(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editEmp && (
        <div style={modalOverlay} onClick={() => setEditEmp(null)}>
          <div style={modernModal} onClick={e => e.stopPropagation()}>

            <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
              Edit Employee
            </h2>

            <div style={formGrid}>
              {Object.entries(editEmp).map(([key, value]) => (
                key !== "id" && (
                  <div key={key} style={inputGroup}>
                    <label style={label}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>

                    <input
                      value={value || ""}
                      onChange={(e) =>
                        setEditEmp({ ...editEmp, [key]: e.target.value })
                      }
                      style={input}
                    />
                  </div>
                )
              ))}
            </div>

            <div style={btnContainer}>
              <button
                style={{ ...btn, background: "#2ecc71", color: "#fff" }}
                onClick={handleUpdate}
              >
                Save Changes
              </button>

              <button
                style={{ ...btn, background: "#e74c3c", color: "#fff" }}
                onClick={() => setEditEmp(null)}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Employee;