import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { FaUserEdit, FaSave, FaEnvelope, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";

function AdminProfile() {

  const [admin, setAdmin] = useState({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role")
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(admin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setAdmin(formData);
    localStorage.setItem("name", formData.name);
    setEditMode(false);
  };

  // 🎨 Styles
  const layout = {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f7fb",
    fontFamily:"Arial"
  };

  const main = {
    flex: 1,
    padding: "30px",
    marginLeft: "290px"
  };

  const card = {
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    maxWidth: "600px",
    margin: "auto"
  };

  const avatar = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    color: "#fff",
    margin: "auto",
    marginBottom: "15px"
  };

  const input = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd"
  };

  const btn = {
    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px"
  };

  const infoBox = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
    background: "#f0fdfa",
    padding: "10px",
    borderRadius: "8px"
  };

  return (
    <div style={layout}>
      <AdminSidebar />

      <div style={main}>
        <h2 style={{ marginBottom: "20px" }}>Admin Profile</h2>

        <motion.div
          style={card}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >

          {/* Avatar */}
          <div style={avatar}>
            {admin.name?.charAt(0).toUpperCase()}
          </div>

          {/* VIEW MODE */}
          {!editMode ? (
            <>
              <h3 style={{ textAlign: "center" }}>{admin.name}</h3>

              {/* Info Boxes */}
              <div style={infoBox}>
                <FaEnvelope color="#14b8a6" />
                <span>{admin.email}</span>
              </div>

              <div style={infoBox}>
                <FaUserShield color="#14b8a6" />
                <span>{admin.role}</span>
              </div>

              {/* Extra Section */}
              <div style={{
                marginTop: "20px",
                background: "#eef2ff",
                padding: "15px",
                borderRadius: "10px"
              }}>
                <p><b>Last Login:</b> Today</p>
                <p><b>Status:</b> Active</p>
              </div>

              <motion.button
                style={btn}
                whileHover={{ scale: 1.05 }}
                onClick={() => setEditMode(true)}
              >
                <FaUserEdit /> Edit Profile
              </motion.button>
            </>
          ) : (
            <>
              {/* EDIT MODE */}
              <input
                style={input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />

              <input
                style={input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />

              <motion.button
                style={btn}
                whileHover={{ scale: 1.05 }}
                onClick={handleSave}
              >
                <FaSave /> Save
              </motion.button>
            </>
          )}

        </motion.div>

        {/* 🔥 Extra Cards Section */}
        <div style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px"
        }}>

          {/* <motion.div
            style={card}
            whileHover={{ scale: 1.03 }}
          >
            <h4>Total Employees</h4>
            <h2 style={{ color: "#14b8a6" }}>120</h2>
          </motion.div>

          <motion.div
            style={card}
            whileHover={{ scale: 1.03 }}
          >
            <h4>Projects Managed</h4>
            <h2 style={{ color: "#06b6d4" }}>45</h2>
          </motion.div> */}

        </div>

      </div>
    </div>
  );
}

export default AdminProfile;