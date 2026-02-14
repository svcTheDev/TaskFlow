import { TasksContext } from "./TasksContext";
import  useTasks from "./useTasks";

interface TaskFormProp {
  children: React.ReactNode;
}

export function TasksProvider({ children } : TaskFormProp) {
  const tasks = useTasks(); // aquí vive tu reducer + actions
  return (
    <TasksContext value={tasks}>
      {children}
    </TasksContext>
  );
}