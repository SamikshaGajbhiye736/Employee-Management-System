import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EmployeeProfile from "./EmployeeProfile";

function EmployeeSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const sidebarStyle = {
        width: "250px",
        height: "100vh",
        background: "#1f2d3d",
        color: "#fff",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "25px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    };

    const menuItemStyle = (path) => ({
        padding: "12px 15px",
        margin: "10px 0",
        cursor: "pointer",
        borderRadius: "8px",
        background: location.pathname === path ? "#00C897" : "transparent",
        color: location.pathname === path ? "#000" : "#fff",
        fontWeight: location.pathname === path ? "bold" : "normal",
        transition: "0.3s",
    });

    const menuItemHover = (e) => {
        if (e.currentTarget.style.background !== "rgb(0, 200, 151)") {
            e.currentTarget.style.background = "#156d5e";
        }
    };

    const menuItemOut = (e) => {
        if (e.currentTarget.style.background !== "rgb(0, 200, 151)") {
            e.currentTarget.style.background = "transparent";
        }
    };

    return (
        <div style={sidebarStyle}>
            <div>
                <h3 style={{ marginBottom: "30px" }}>Employee Panel</h3>

                <div
                    style={menuItemStyle("/employee-dashboard")}
                    onClick={() => navigate("/employee-dashboard")}
                    onMouseEnter={menuItemHover}
                    onMouseLeave={menuItemOut}
                >
                    Dashboard
                </div>

                <div
                    style={menuItemStyle("/my-profile")}
                    onClick={() => navigate("/my-profile")}
                    onMouseEnter={menuItemHover}
                    onMouseLeave={menuItemOut}
                >
                    My Profile
                </div>

                <div
                    style={menuItemStyle("/employee-tasks")}
                    onClick={() => navigate("/employee-tasks")}
                    onMouseEnter={menuItemHover}
                    onMouseLeave={menuItemOut}
                >
                    My Tasks
                </div>

                <div
                    style={menuItemStyle("/employee-attendance")}
                    onClick={() => navigate("/employee-attendance")}
                    onMouseEnter={menuItemHover}
                    onMouseLeave={menuItemOut}
                >
                    Attendance
                </div>
            </div>

            <div
                style={{ cursor: "pointer", color: "#ff4d4f", fontWeight: "bold" }}
                onClick={() => {
                    localStorage.clear();
                    navigate("/");
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff7875")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ff4d4f")}
            >
                Logout
            </div>
        </div>
    );
}

export default EmployeeSidebar;