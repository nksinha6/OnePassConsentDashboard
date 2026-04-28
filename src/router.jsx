import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginFlow from "./pages/LoginFlow";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginFlow />,
  },
  {
    // All authenticated pages share this layout
    element: (
      <ProtectedRoute>
        <AppLayout>{/* Outlet renders the matched child route */}</AppLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },

      // ← add future pages here, they all get header automatically
      // { path: "/profile", element: <Profile /> },
      // { path: "/settings", element: <Settings /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
