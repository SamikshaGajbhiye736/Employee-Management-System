import React, { useEffect, useState } from "react";
import EmployeeSidebar from "./EmployeeSidebar";

function EmployeeTasks() {

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    taskName: "",
    project: "",
    assignedBy: "",
    startDate: "",
    email: localStorage.getItem("email")
  });

  const email = localStorage.getItem("email");

  // ✅ Fetch Tasks
  const fetchTasks = () => {
    fetch(`http://localhost:8082/tasks/${email}`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add / Update
  const handleSubmit = () => {

    const url = editId
      ? `http://localhost:8082/tasks/${editId}`
      : `http://localhost:8082/tasks`;

    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(() => {
        fetchTasks();
        setShowForm(false);
        setEditId(null);
        setFormData({
          taskName: "",
          project: "",
          assignedBy: "",
          startDate: "",
          email: localStorage.getItem("email")
        });
      })
      .catch(err => console.log(err));
  };

  // ✅ Edit
  const handleEdit = (task) => {
    setFormData(task);
    setEditId(task.id);
    setShowForm(true);
  };

  // ✅ Delete
  const handleDelete = (id) => {
    fetch(`http://localhost:8082/tasks/${id}`, {
      method: "DELETE"
    })
      .then(() => fetchTasks())
      .catch(err => console.log(err));
  };

  // ================= STYLES =================

  const layout = {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f7fb",
    fontFamily: "Arial"
  };

  const main = {
    flex: 1,
    marginLeft: "290px",
    padding: "25px"
  };

  const header = {
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    padding: "20px 25px",
    borderRadius: "12px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
  };

  const addBtn = {
    background: "#fff",
    color: "#4f46e5",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  };

  const tableBox = {
    marginTop: "25px",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
  };

  const th = {
    background: "#eef2ff",
    padding: "12px",
    textAlign: "left",
    color: "#4f46e5"
  };

  const td = {
    padding: "12px",
    borderBottom: "1px solid #eee"
  };

  const btn = {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  };

  // ================= UI =================

  return (
    <div style={layout}>

      <EmployeeSidebar />

      <div style={main}>

        {/* Header */}
        <div style={header}>
          <h2>My Tasks</h2>

          <button
            style={addBtn}
            onClick={() => {
              setEditId(null);
              setShowForm(true);
            }}
          >
            + Add Task
          </button>
        </div>

        {/* 🔥 POPUP */}
        {showForm && (
          <>
            {/* Blur */}
            <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backdropFilter: "blur(5px)",
              background: "rgba(0,0,0,0.3)",
              zIndex: 999
            }}></div>

            {/* Popup Box */}
            <div style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              width: "400px",
              zIndex: 1000,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}>

              <h3 style={{ color: "#4f46e5" }}>
                {editId ? "Edit Task" : "Add Task"}
              </h3>

              <input name="taskName" placeholder="Task Name" value={formData.taskName} onChange={handleChange} style={inputStyle} />
              <input name="project" placeholder="Project" value={formData.project} onChange={handleChange} style={inputStyle} />
              <input name="assignedBy" placeholder="Assigned By" value={formData.assignedBy} onChange={handleChange} style={inputStyle} />
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} style={inputStyle} />

              <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={handleSubmit}
                  style={{ background: "#4f46e5", color: "#fff", padding: "8px 15px", border: "none", borderRadius: "6px" }}
                >
                  Save
                </button>

                <button
                  onClick={() => setShowForm(false)}
                  style={{ background: "#e5e7eb", padding: "8px 15px", border: "none", borderRadius: "6px" }}
                >
                  Cancel
                </button>
              </div>

            </div>
          </>
        )}

        {/* Table */}
        <div style={tableBox}>
          <table width="100%">
            <thead>
              <tr>
                {/* <th style={th}>ID</th> */}
                <th style={th}>Task Name</th>
                <th style={th}>Project</th>
                <th style={th}>Assigned By</th>
                <th style={th}>Start Date</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task.id}>
                    {/* <td style={td}>{task.id}</td> */}
                    <td style={td}>{task.taskName}</td>
                    <td style={td}>{task.project}</td>
                    <td style={td}>{task.assignedBy}</td>
                    <td style={td}>{task.startDate}</td>

                    <td style={td}>
                      <button
                        style={{ ...btn, background: "#4f46e5", color: "#fff" }}
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </button>

                      <button
                        style={{ ...btn, background: "#ef4444", color: "#fff" }}
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={td} colSpan="6" align="center">
                    No Tasks Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default EmployeeTasks;