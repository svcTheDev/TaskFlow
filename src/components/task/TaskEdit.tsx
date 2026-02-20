import { useTasksContext } from "@/hooks/TasksContext";
import { useRef } from "react";

interface Prop {
  id: number;
}

export default function TaskEdit({ id }: Prop) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { editValue, setEditValue, onSaveEdit, onCancelEdit } =
    useTasksContext();

  const onEnterButton = (
    e: React.KeyboardEvent,
    currentId: number,
    currentValue: string,
  ) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      onSaveEdit(currentId, currentValue);
    }
    if (e.key === "Escape" || e.key === "Esc") {
      onCancelEdit();
    }
  };

  return (
    <>
      <label className="flex items-center gap-2">
        <input
          ref={inputRef}
          autoFocus
          className="w-full max-w-xs rounded-lg border border-slate-300 bg-white/90 px-3 py-2 text-xl text-slate-800 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder="Editar tarea..."
          onKeyDown={(e) => onEnterButton(e, id, editValue)}
        />
      </label>

      <div className="flex items-center gap-4 text-2xl">
        <button
          onClick={() => onSaveEdit(id, editValue)}
          className="cursor-pointer text-sky-700 transition hover:text-sky-600"
        >
          Guardar
        </button>
        <button
          onClick={() => onCancelEdit()}
          className="cursor-pointer text-slate-500 transition hover:text-slate-700"
        >
          Cancelar
        </button>
      </div>
    </>
  );
}
