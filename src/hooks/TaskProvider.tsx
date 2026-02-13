import { TasksContext } from "./TasksContext";
import  useTasks from "./useTasks";


export function TasksProvider({ children }) {
  const tasks = useTasks(); // aquí vive tu reducer + actions
  return (
    <TasksContext.Provider value={tasks}>
      {children}
    </TasksContext.Provider>
  );
}