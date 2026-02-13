import { useTasksContext } from "@/hooks/TasksContext";
import TaskEdit from "./TaskEdit";
import TaskItem from "./TaskItem";


export default function TaskList() {
    const { state } = useTasksContext();
    return (
    <section className="mx-auto w-full max-w-2xl rounded-2xl border border-blue-500 bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-5 text-white shadow-xl">
      <h2 className="mb-6 text-center text-5xl font-bold">Task List</h2>

      <ul className="space-y-3">
        {state.tasks.map((item) =>
          state.editingTaskId === item.id ? (
            <TaskEdit id={item.id} />
        
          ) : (
            <TaskItem id={item.id} completed={item.completed} task={item.task}/>
          ),
        )}
      </ul>
    </section>
  );
}
