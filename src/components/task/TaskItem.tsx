import { Task } from "@/state/taskReducer";
import { useTasksContext } from "@/hooks/TasksContext";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function TaskItem({ id, completed, task }: Task) {
  const { onToggle, onDelete, onStartEdit } = useTasksContext();
  return (
    <>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="h-4 w-4 accent-blue-500 cursor-pointer "
        />
        <span
          className={`text-2xl ${
            completed
              ? "text-slate-400 transition line-through"
              : "text-slate-800"
          }`}
        >
          {task}
        </span>
      </label>
      <div className="flex items-center gap-4 text-2xl">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="cursor-pointer text-slate-500 transition hover:text-rose-500">
              <Trash2 />
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-zinc-900 text-zinc-100 border-zinc-700">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete task?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The task "{task}" will be
                permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer text-black hover:bg-zinc-300">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer bg-red-600 hover:bg-red-700"
                onClick={() => onDelete(id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <button
          onClick={() => onStartEdit(id, task)}
          className="cursor-pointer text-slate-500 transition hover:text-sky-600"
        >
          <Pencil />
        </button>
      </div>
    </>
  );
}
