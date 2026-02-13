import { createContext, useContext } from "react";
import useTasks from "./useTasks";

export type TasksContextValue = ReturnType<typeof useTasks>;

export const TasksContext = createContext<TasksContextValue | null>(null);

export function useTasksContext() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasksContext must be used within TasksProvider");
  return ctx;
}
