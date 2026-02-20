import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import TaskList from "./TaskList";
import { useTasksContext } from "@/hooks/TasksContext";

export default function TaskForm() {
  const [inputValue, setInputValue] = useState("");
  const { handleSubmit } = useTasksContext();

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, inputValue, setInputValue)}>
        <label className="block text-sm font-semibold uppercase tracking-wide text-slate-700" htmlFor="task">Insertar tarea</label>
        <Input
          className="h-12 rounded-xl border-slate-300 bg-white/90 text-base shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 mb-4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe la tarea"
        />
        <Button
          className="bg-todo-topbar transition cursor-pointer"
          type="submit"
          size="lg"
        >
          Guardar
        </Button>
      </form>
     

      <TaskList />
    </>
  );
}
