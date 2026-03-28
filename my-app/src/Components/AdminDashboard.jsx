import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useRef } from "react";
import AdminSidebar from "./AdminSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

// CountUp Component
function CountUp({ end }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const duration = 1000;
        const increment = end / (duration / 20);
        const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
                start = end;
                clearInterval(counter);
            }
            setCount(Math.floor(start));
        }, 20);
        return () => clearInterval(counter);
    }, [end]);
    return <span>{count}</span>;
}

function AdminDashboard() {
    const [active, setActive] = useState("dashboard");
    const navigate = useNavigate();
    const location = useLocation();

    // Example Data
    const employeeData = [
        { name: "Jan", employees: 10 },
        { name: "Feb", employees: 15 },
        { name: "Mar", employees: 20 },
        { name: "Apr", employees: 18 },
        { name: "May", employees: 22 },
        { name: "Jun", employees: 25 }
    ];

    const projectData = [
        { name: "Project A", tasks: 12 },
        { name: "Project B", tasks: 20 },
        { name: "Project C", tasks: 8 },
        { name: "Project D", tasks: 15 }
    ];

    const layout = { display: "flex", minHeight: "100vh", fontFamily: "Arial", background: "#f0f4f8" };
    const main = { flex: 1, padding: "20px", marginLeft: "290px", animation: "fadeIn 1s ease" };
    // const topbar = { background: "#fff", padding: "15px 20px", borderRadius: "10px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" };
    const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" };

    // Gradient Cards
    const card = {
        background: "linear-gradient(135deg, #1f768f, #3aa1b1)",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        transition: "0.3s",
        cursor: "pointer",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
    };

    const topbar = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        marginBottom: "40px",
        borderRadius: "10px"
    };

    const rightSection = {
        display: "flex",
        alignItems: "center",
        gap: "20px"
    };

    const iconBox = {
        fontSize: "20px",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "50%",
        transition: "0.3s"
    };

    const profileBox = {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 12px",
        borderRadius: "20px",
        background: "#f1f3f6",
        cursor: "pointer",
        position: "relative",
        fontWeight: "500"
    };

    const dropdown = {
        position: "absolute",
        top: "45px",
        right: "0",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        padding: "10px",
        width: "140px",
        zIndex: 100
    };

    const logoutBtn = {
        width: "100%",
        padding: "10px",
        border: "none",
        background: "none",
        cursor: "pointer",
        textAlign: "left",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        fontWeight: "700",
        fontSize:"17px",
        color: "#e74c3c",
        transition: "0.2s"
    };

    const notificationStyle = {
        position: "absolute",
        top: "-10px",
        right: "50%",
        transform: "translateX(50%)",
        background: "#2ecc71",
        color: "#fff",
        padding: "8px 15px",
        borderRadius: "8px",
        fontSize: "14px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        animation: "fadeIn 0.5s ease"
    };


    const hover = (e) => e.currentTarget.style.transform = "translateY(-10px)";
    const out = (e) => e.currentTarget.style.transform = "translateY(0)";
    // const [message, setMessage] = useState("");

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    useEffect(() => {
    if (location.state?.loginSuccess) {
        toast.success("Logged in successfully ✅", {
            position: "top-right",
            autoClose: 2000,
        });

        window.history.replaceState({}, document.title);
    }
}, []);


    const handleLogout = () => {
        localStorage.removeItem("token");

        toast.success("Logged out successfully ✅", {
            position: "top-right",
            autoClose: 2000,
        });

        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    };


    return (
        <div style={layout}>
            <ToastContainer />
            <AdminSidebar />

            <div style={main}>

                <div style={topbar}>

                    {/* Left */}
                    <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Welcome Admin
                    </div>

                    {/* Right */}
                    <div style={rightSection}>

                        {/* {message && (
                            <div style={notificationStyle}>
                                {message}
                            </div>
                        )} */}

                        {/* Notification Icon */}
                        <div
                            style={iconBox}
                            onMouseEnter={(e) => e.currentTarget.style.background = "#f0f0f0"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                            <FaBell />
                        </div>

                        {/* Profile */}
                        <div
                            ref={dropdownRef}
                            style={profileBox}
                            onClick={() => setOpen(!open)}   // ✅ only toggle on click
                            onMouseEnter={(e) => e.currentTarget.style.background = "#e0e0e0"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "#f1f3f6"}
                        >
                            <FaUserCircle size={28} />
                            <span>Admin</span>

                            {/* ✅ Dropdown only shows when open = true */}
                            {open && (
                                <div style={dropdown}>
                                    <button
                                        style={logoutBtn}
                                        onClick={handleLogout}
                                        onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f5"}
                                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                                    >
                                        <FaSignOutAlt style={{ marginRight: "8px" }} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>

                </div>

                {/* Dashboard Cards */}
                <div style={grid}>
                    <div style={card} onMouseEnter={hover} onMouseLeave={out}>
                        <h4>Total Employees</h4>
                        <h2><CountUp end={120} /></h2>
                        <div style={{ height: "5px", background: "rgba(255,255,255,0.3)", borderRadius: "5px" }}>
                            <div style={{ width: "80%", height: "5px", background: "#fff", borderRadius: "5px", transition: "width 1s" }}></div>
                        </div>
                    </div>

                    <div style={card} onMouseEnter={hover} onMouseLeave={out}>
                        <h4>Total Projects</h4>
                        <h2><CountUp end={45} /></h2>
                        <div style={{ height: "5px", background: "rgba(255,255,255,0.3)", borderRadius: "5px" }}>
                            <div style={{ width: "60%", height: "5px", background: "#fff", borderRadius: "5px", transition: "width 1s" }}></div>
                        </div>
                    </div>

                    <div style={card} onMouseEnter={hover} onMouseLeave={out}>
                        <h4>Active Tasks</h4>
                        <h2><CountUp end={80} /></h2>
                        <div style={{ height: "5px", background: "rgba(255,255,255,0.3)", borderRadius: "5px" }}>
                            <div style={{ width: "70%", height: "5px", background: "#fff", borderRadius: "5px", transition: "width 1s" }}></div>
                        </div>
                    </div>

                    <div style={card} onMouseEnter={hover} onMouseLeave={out}>
                        <h4>Pending Requests</h4>
                        <h2><CountUp end={12} /></h2>
                        <div style={{ height: "5px", background: "rgba(255,255,255,0.3)", borderRadius: "5px" }}>
                            <div style={{ width: "30%", height: "5px", background: "#fff", borderRadius: "5px", transition: "width 1s" }}></div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 3px 10px rgba(0,0,0,0.05)" }}>
                        <h4>Monthly Employee Growth</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={employeeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="employees" stroke="#1f768f" strokeWidth={3} animationDuration={2000} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 3px 10px rgba(0,0,0,0.05)" }}>
                        <h4>Project Tasks Overview</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={projectData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="tasks" fill="#1f768f" radius={[5, 5, 0, 0]} animationDuration={2000} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={{
                    marginTop: "30px",
                    background: "linear-gradient(135deg, #1f768f, #3aa1b1)",
                    padding: "20px",
                    borderRadius: "12px",
                    color: "#fff",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                    animation: "fadeIn 1s ease"
                }}>
                    <h3 style={{ marginBottom: "15px" }}>Recent Activity</h3>
                    <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
                        <li style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                            <span style={{
                                display: "inline-block",
                                width: "12px",
                                height: "12px",
                                background: "#ffc107",
                                borderRadius: "50%",
                                marginRight: "10px"
                            }}></span>
                            New Employee Joined
                        </li>
                        <li style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                            <span style={{
                                display: "inline-block",
                                width: "12px",
                                height: "12px",
                                background: "#4caf50",
                                borderRadius: "50%",
                                marginRight: "10px"
                            }}></span>
                            Project Milestone Completed
                        </li>
                        <li style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                            <span style={{
                                display: "inline-block",
                                width: "12px",
                                height: "12px",
                                background: "#ff5722",
                                borderRadius: "50%",
                                marginRight: "10px"
                            }}></span>
                            Task Deadline Updated
                        </li>
                        <li style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                            <span style={{
                                display: "inline-block",
                                width: "12px",
                                height: "12px",
                                background: "#9c27b0",
                                borderRadius: "50%",
                                marginRight: "10px"
                            }}></span>
                            Report Generated Successfully
                        </li>
                    </ul>
                </div>
            </div>

            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
            </style>
        </div>
    );
}

export default AdminDashboard;