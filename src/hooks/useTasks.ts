import React, { useReducer, useState } from "react";
import { taskReducer, getInitialStateTask } from "@/state/taskReducer";


export default function useTasks() {
  const [state, dispatcher] = useReducer(taskReducer, getInitialStateTask());
  const [editValue, setEditValue] = useState("");

  const onToggle = (id: number) => {
    dispatcher({ type: "TOGGLE_TASK", payload: id });
  };
  const onDelete = (id: number) => {
    dispatcher({ type: "DELETE_TASK", payload: id });
  };
  const onStartEdit = (id: number, task: string) => {
    setEditValue(task);
    dispatcher({ type: "START_EDIT", payload: id });
  };
  const onSaveEdit = (id: number, item: string) => {
    if (!item) {
      return;
    }
    dispatcher({ type: "SAVE_EDIT", payload: { item: item, id: id } });
  };
  const onCancelEdit = () => {
    dispatcher({ type: "CANCEL_EDIT", payload: null });
  };
  const onEnterButton = (
    e: React.KeyboardEvent,
    id: number,
    editValue: string,
  ) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      onSaveEdit(id, editValue);
    }
    if (e.key === "Escape" || e.key === "Esc") {
      onCancelEdit();
    }
  };

  return {
    // Properties
    state,
    editValue,
    // Methods
    setEditValue,
    dispatcher,
    onToggle,
    onDelete,
    onStartEdit,
    onSaveEdit,
    onCancelEdit,
    onEnterButton,
  };
}
