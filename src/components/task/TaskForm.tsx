import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import TaskList from "./TaskList";
import { useTasksContext } from "@/hooks/TasksContext";

export default function TaskForm() {
  const [inputValue, setInputValue] = useState("");
  const { state, handleSubmit } = useTasksContext();

  
  useEffect(() => {
    localStorage.setItem("tasks-state", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, inputValue, setInputValue)}>
        <label htmlFor="task">Insertar tarea</label>
        <Input
          className="mb-4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe la tarea"
        />
        <Button className="cursor-pointer" type="submit" size="lg">
          Guardar
        </Button>
      </form>

      <TaskList />
    </>
  );
}
