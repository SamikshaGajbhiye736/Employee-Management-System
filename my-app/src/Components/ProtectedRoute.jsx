import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired }) {

  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/" />; // not logged in
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />; // wrong role
  }

  return children;
}

export default ProtectedRoute;