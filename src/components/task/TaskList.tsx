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
    <section className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-300/80 bg-gradient-to-br from-slate-100/95 via-blue-50/90 to-slate-100/95 p-6 text-slate-700 shadow-[0_18px_40px_-20px_rgba(51,65,85,0.35)] backdrop-blur-sm">
      <h2 className="mb-6 text-center text-5xl font-bold tracking-tight text-slate-800">Lista de Tareas</h2>
         <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
           <a
              className={`cursor-pointer ${filter_class === "all" ? "font-semibold text-slate-800" : "text-slate-500" }`}
              onClick={() => handleFilterView("all")}>
                Total de tareas: {state.tasks.length}
              </a>
              <a
                className={`cursor-pointer ${filter_class === "completed" ? "font-semibold text-slate-800" : "text-slate-500" }`}
                onClick={() => handleFilterView("completed")}
              >
                Tareas Completadas: {state.completed}
              </a>
              <a
                className={`cursor-pointer ${filter_class === "pending" ? "font-semibold text-slate-800" : "text-slate-500" }`}
                onClick={() => handleFilterView("pending")}
              >
                Tareas Pendientes: {state.pending}
              </a>
         </div>

      <ul className="space-y-3 rounded-xl border border-slate-300/80 bg-white/65 px-4 py-3">
        {baseTasks.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-white/75 px-3 py-2 shadow-sm"
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
