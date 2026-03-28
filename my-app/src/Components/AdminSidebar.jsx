import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const sidebarStyle = {
        width: "250px",
        height: "100vh",
        background: "#1f2d3d", // darker teal/navy
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
        background: location.pathname === path ? "#00C897" : "transparent", // active
        color: location.pathname === path ? "#000" : "#fff",
        fontWeight: location.pathname === path ? "bold" : "normal",
        transition: "0.3s",
    });

    const menuItemHover = (e) => {
        if (e.currentTarget.style.background !== "rgb(0, 200, 151)") {
            e.currentTarget.style.background = "#156d5e"; // hover teal
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
                <h3 style={{ marginBottom: "30px" }}>Admin Panel</h3>

                <div
                    style={menuItemStyle("/admin-dashboard")}
                    onClick={() => navigate("/admin-dashboard")}
                    onMouseEnter={menuItemHover}
                    onMouseLeave={menuItemOut}
                >
                    Dashboard
                </div>

                <div
                    style={menuItemStyle("/employees")}
                    onClick={() => navigate("/employees")}
                    onMouseEnter={menuItemHover}
                    onMouseLeave={menuItemOut}
                >
                    Employees
                </div>

                <div
                    style={menuItemStyle("/add-employee")} // ✅ match the route
                    onClick={() => navigate("/add-employee")} // ✅ navigate to Add Employee page
                    onMouseEnter={menuItemHover}           // optional hover styling
                    onMouseLeave={menuItemOut}             // optional hover styling
                >
                    Add Employee
                </div>



                <div
                    style={menuItemStyle("/admin-profile")}
                    onClick={() => navigate("/admin-profile")}
                    onMouseEnter={menuItemHover}
                    onMouseLeave={menuItemOut}
                >
                    Profile
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

export default Sidebar;