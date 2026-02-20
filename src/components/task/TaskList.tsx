import { useTasksContext } from "@/hooks/TasksContext";
import TaskEdit from "./TaskEdit";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { state, handleFilterView} = useTasksContext();

  const {tasks, search_query: search} = state;

    const filter_class = (() => {
      switch (state.filter_view) {
        case "pending":
          return "pending";
        case "completed":
          return "completed";
        case "all":
        default:
          return "all";
      }
    })();

  const visibleTasks = (() => {
    switch (state.filter_view) {
      case "pending": 
        return tasks.filter((task) => !task.completed);
      case "completed": 
        return tasks.filter((task) => task.completed);
      case "all":
      default:
        return tasks;
    }
  })();

  const baseTasks = search ? tasks.filter((task) => task.task.includes(search)) : visibleTasks

  return (
    <section className="mx-auto w-full max-w-2xl rounded-2xl border border-blue-500 bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-5 text-white shadow-xl">
      <h2 className="mb-6 text-center text-5xl font-bold">Task List</h2>
         <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
           <a
              className={`cursor-pointer ${filter_class === "all" ? "text-white" : "text-gray-500" }`}
              onClick={() => handleFilterView("all")}>
                Total de tareas: {state.tasks.length}
              </a>
              <a
                className={`cursor-pointer ${filter_class === "completed" ? "text-white" : "text-gray-500" }`}
                onClick={() => handleFilterView("completed")}
              >
                Tareas Completadas: {state.completed}
              </a>
              <a
                className={`cursor-pointer ${filter_class === "pending" ? "text-white" : "text-gray-500" }`}
                onClick={() => handleFilterView("pending")}
              >
                Tareas Pendientes: {state.pending}
              </a>
         </div>

      <ul className="space-y-3">
        {baseTasks.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-md border border-zinc-300/70 px-3 py-2"
          >
            {state.editingTaskId === item.id ? (
              <TaskEdit id={item.id} />
            ) : (
              <TaskItem
                id={item.id}
                completed={item.completed}
                task={item.task}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
