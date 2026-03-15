import MainLayout from "@/layouts/MainLayout";
import LoginPage from "@/pages/LoginPage";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router";
import { useAuth } from "@/context/authProvider";

export default function AppRouter() {
  const { user } = useAuth(); // viene de tu auth real

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/main" replace /> : <LoginPage />}
        />

        <Route
          path="/main"
          element={user ? <MainLayout /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

// export const router = createBrowserRouter([
//     {path: "/", element: <LoginPage/>},
//     {path: "/tasks", element: <MainLayout/>},
// ])
