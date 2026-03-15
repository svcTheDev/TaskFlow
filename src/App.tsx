import { TasksProvider } from "./hooks/TaskProvider";
import { AuthProvider } from "./context/authProvider";
import { RouterProvider } from "react-router";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <AppRouter/>
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
