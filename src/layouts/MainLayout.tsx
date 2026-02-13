import React from "react";
import TaskForm from "../components/task/TaskForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TasksProvider } from "@/hooks/TaskProvider";

export default function MainLayout() {

  return (
    <div className="min-h-screen bg-linear-to-r from-slate-900 to-slate-700 px-4 py-10 ">
      <div className="mx-auto w-full max-w-xl">
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
            <TasksProvider>
              <TaskForm />
            </TasksProvider>
          </CardContent>

          <CardFooter className="text-xs text-zinc-500">
            Total de tareas: 0
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
