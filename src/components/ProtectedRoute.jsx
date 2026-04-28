import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();

  // Guard against null context
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
