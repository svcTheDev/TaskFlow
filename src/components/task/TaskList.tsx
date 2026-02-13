import React, { useEffect, useReducer, useState } from "react";
import { taskReducer, getInitialStateTask } from "@/state/taskReducer";

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
  state,
  dispatcher,
  editingTaskId,
}: TaskListProps) {
  const [editValue, setEditValue] = useState("");
  const onToggle = (id) => {
    dispatcher({ type: "TOGGLE_TASK", payload: id });
  };
  const onDelete = (id) => {
    dispatcher({ type: "DELETE_TASK", payload: id });
  };
  const onStartEdit = (id, task) => {
    setEditValue(task)
    dispatcher({ type: "START_EDIT", payload: id });
  };
  const onSaveEdit = (item, id) => {
    if (!item) {
      return
    }
    dispatcher({ type: "SAVE_EDIT", payload: { item: item, id: id } });
  };
  const onCancelEdit = () => {
    dispatcher({ type: "CANCEL_EDIT", payload: null });
  };
  const onEnterButton = (e:  React.KeyboardEvent, editValue, id) => {
    if(e.code === 'Enter' || e.code === 'NumpadEnter') {
      onSaveEdit(editValue, id);
    }
    if(e.key === 'Escape' || e.key === 'Esc') {
      onCancelEdit();
    }


  };



  return (
    <section className="mx-auto w-full max-w-2xl rounded-2xl border border-blue-500 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-5 text-white shadow-xl">
      <h2 className="mb-6 text-center text-5xl font-bold">Task List</h2>

      <ul className="space-y-3">
        {tasks.map((item) =>
          editingTaskId === item.id ? (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-md border border-zinc-300/70 px-3 py-2"
            >
              <label className="flex items-center gap-2">
                <input

                  className="text-2xl max-w-3xs}"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="inválido"
                  onKeyDown={(e) => onEnterButton(e, editValue, item.id)}
                />
              </label>
              
              <div className="flex items-center gap-4 text-2xl">
                <button
                  onClick={() => onSaveEdit(editValue, item.id)}
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
            </li>
          ) : (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-md border border-zinc-300/70 px-3 py-2"
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggle(item.id)}
                  className="h-4 w-4 accent-blue-500 cursor-pointer"
                />
                <span
                  className={`text-2xl ${
                    item.completed
                      ? "text-zinc-400 line-through"
                      : "text-zinc-100"
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
                  onClick={() => onStartEdit(item.id, item.task)}
                  className="text-pink-500 transition hover:text-pink-400"
                >
                  Edit
                </button>
              </div>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
