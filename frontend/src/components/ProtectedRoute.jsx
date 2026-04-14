import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, ifAuthenticated = false }) {
  const token = localStorage.getItem("token");

  if (!token && !ifAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (token && ifAuthenticated) {
    return <Navigate to="/posts" replace />;
  }
  return children;
}

export default ProtectedRoute;
