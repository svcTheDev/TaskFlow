type Task = {
  id: number;
  task: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: TaskListProps) {
  const completed = tasks.filter((t) => t.completed).length;
  const uncompleted = tasks.length - completed;

  return (
    <section className="mx-auto w-full max-w-2xl rounded-2xl border border-blue-500 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-5 text-white shadow-xl">
      <h2 className="mb-6 text-center text-5xl font-bold">Task List</h2>

      <ul className="space-y-3">
        {tasks.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-md border border-zinc-300/70 px-3 py-2"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggle(item.id)}
                className="h-4 w-4 accent-blue-500"
              />
              <span
                className={`text-2xl ${
                  item.completed ? "text-zinc-400 line-through" : "text-zinc-100"
                }`}
              >
                {item.task}
              </span>
            </label>

            <div className="flex items-center gap-4 text-2xl">
              <button
                onClick={() => onDelete(item.id)}
                className="text-pink-500 transition hover:text-pink-400"
              >
                Delete
              </button>
              <button
                onClick={() => onEdit(item.id)}
                className="text-pink-500 transition hover:text-pink-400"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-blue-500 pt-3 text-center text-2xl">
        Completed: {completed} | Uncompleted: {uncompleted}
      </div>
    </section>
  );
}
