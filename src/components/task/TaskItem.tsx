import { Task } from "@/state/taskReducer";
import { useTasksContext } from "@/hooks/TasksContext";

export default function TaskItem({ id, completed, task }: Task) {
    const { onToggle, onDelete, onStartEdit } = useTasksContext();
  return (
      <li
        key={id}
        className="flex items-center justify-between rounded-md border border-zinc-300/70 px-3 py-2"
      >
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle(id)}
            className="h-4 w-4 accent-blue-500 cursor-pointer"
          />
          <span
            className={`text-2xl ${
              completed ? "text-zinc-400 line-through" : "text-zinc-100"
            }`}
          >
            {task}
          </span>
        </label>

        <div className="flex items-center gap-4 text-2xl">
          <button
            onClick={() => onDelete(id)}
            className="text-pink-500 transition hover:text-pink-400"
          >
            Delete
          </button>
          <button
            onClick={() => onStartEdit(id, task)}
            className="text-pink-500 transition hover:text-pink-400"
          >
            Edit
          </button>
        </div>
      </li>
  );
}
