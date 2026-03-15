import { useAuth } from "@/context/authProvider";
import LoginPage from "@/pages/LoginPage";
import { Navigate } from "react-router";

export default function ValidateRoutes({ children }) {
  const { user } = useAuth();// viene de tu auth real
  return user ? children : <Navigate to="/login" replace />;
}
