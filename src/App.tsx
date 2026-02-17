import MainLayout from "./layouts/MainLayout";
import { TasksProvider } from "./hooks/TaskProvider";

function App() {
  return (
    <TasksProvider>
      <MainLayout />
    </TasksProvider>
  );
}

export default App;
