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
    <div className="min-h-screen bg-linear-to-r from-slate-900 to-slate-700 px-4 py-10 ">
      <div className="mx-auto w-full max-w-xl">
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSearch((prev) => !prev)}
            className="cursor-pointer rounded-md border border-zinc-700 bg-zinc-900 p-2 text-zinc-200 transition hover:bg-zinc-800"
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
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-blue-500"
            />
          </div>
        </div>

        <Card className="border-zinc-800 bg-zinc-950 text-zinc-100 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              TaskFlow Lite
            </CardTitle>
            <CardDescription className="text-zinc-400">
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
