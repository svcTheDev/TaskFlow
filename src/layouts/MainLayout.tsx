import React, { useEffect, useState } from "react";
import TaskForm from "../components/task/TaskForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useTasksContext } from "@/hooks/TasksContext";
import { Search, X } from "lucide-react";

export default function MainLayout() {
  const { state, handleQuerySearch } = useTasksContext();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      handleQuerySearch(query);
    }, 200);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [query, handleQuerySearch]);

  useEffect(() => {
    localStorage.setItem("tasks-state", JSON.stringify(state));
  }, [state]);

  return (
    <div className="pt-9 min-h-screen bg-linear-to-r bg-todo-scene ">
      <div className="mx-auto w-full max-w-xl">
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSearch((prev) => !prev)}
            className="cursor-pointer rounded-md border bg-todo-topbar p-2 text-zinc-200 transition hover:bg-zinc-800"
            aria-label="Toggle search"
          >
            {showSearch ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>

          <div
            className={` overflow-hidden transition-all duration-300 ${
              showSearch ? "w-64 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar Tarea..."
              className="w-full rounded-md borderpx-3 py-2 text-sm  outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>

        <Card className="shadow-todo">
          <CardHeader className="space-y-2 pb-2">
            <CardTitle className="bg-linear-to-r from-slate-900 via-blue-900 to-slate-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
              TaskFlow Lite
            </CardTitle>
            <CardDescription className="text-base text-slate-600">
              Organiza tus tareas diarias
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <TaskForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
