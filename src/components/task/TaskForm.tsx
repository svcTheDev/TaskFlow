import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import TaskList from "./TaskList";
import { useTasksContext } from "@/hooks/TasksContext";

export default function TaskForm() {
  const [inputValue, setInputValue] = useState("");
  const { state, dispatcher } = useTasksContext();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim().length === 0) return;

    dispatcher({ type: "ADD_TASK", payload: inputValue });

    setInputValue("");
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    localStorage.setItem("tasks-state", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Insertar tarea</label>
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
