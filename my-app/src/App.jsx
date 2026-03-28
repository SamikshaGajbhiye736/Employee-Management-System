import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AdminDashboard from "./Components/AdminDashboard";
import EmployeeDashboard from "./Components/EmployeeDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Employee from "./Components/Employee";
import AddEmployee from "./Components/AddEmployee";
import EmployeeProfile from "./Components/EmployeeProfile";
import EmployeeTasks from "./Components/EmployeeTasks";
import EmployeeAttendance from "./Components/EmployeeAttendance";
import AdminProfile from "./Components/AdminProfile";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute roleRequired="EMPLOYEE">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

                <Route
          path="/employee-tasks"
          element={
            <ProtectedRoute roleRequired="EMPLOYEE">
              <EmployeeTasks />
            </ProtectedRoute>
          }
        />

          <Route
          path="/employee-attendance"
          element={
            <ProtectedRoute roleRequired="EMPLOYEE">
              <EmployeeAttendance />
            </ProtectedRoute>
          }
        />



           <Route
          path="/my-profile"
          element={
            <ProtectedRoute roleRequired="EMPLOYEE">
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />

        {/* ✅ ADD THIS */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <Employee />
            </ProtectedRoute>
          }
        />

                <Route
          path="/admin-profile"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminProfile />
            </ProtectedRoute>
          }
        />

         <Route
          path="/add-employee"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AddEmployee />
            </ProtectedRoute>
          }
        />


      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;