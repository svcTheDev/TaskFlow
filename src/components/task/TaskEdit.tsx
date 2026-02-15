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
    id: number,
    editValue: string,
  ) => {
    inputRef.current?.focus();

    if (e.code === "Enter" || e.code === "NumpadEnter") {
      onSaveEdit(id, editValue);
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
          className="text-2xl max-w-3xs}"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder="inválido"
          onKeyDown={(e) => onEnterButton(e, id, editValue)}
        />
      </label>

      <div className="flex items-center gap-4 text-2xl">
        <button
          onClick={() => onSaveEdit(id, editValue)}
          className="text-pink-500 transition hover:text-pink-400"
        >
          Guardar
        </button>
        <button
          onClick={() => onCancelEdit()}
          className="text-pink-500 transition hover:text-pink-400"
        >
          Cancelar
        </button>
      </div>
    </>
  );
}
