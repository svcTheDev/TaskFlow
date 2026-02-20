import React, { useReducer, useState } from "react";
import { taskReducer, getInitialStateTask } from "@/state/taskReducer";

export default function useTasks() {
  const [state, dispatcher] = useReducer(taskReducer, getInitialStateTask());
  const [editValue, setEditValue] = useState("");

  const handleSubmit = (
    e: React.SubmitEvent<HTMLFormElement>,
    Value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    e.preventDefault();
    if (Value.trim().length === 0) return;
    dispatcher({ type: "ADD_TASK", payload: Value });

    setValue("");
  };

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

  const handleFilterView = (view : "all" | "pending" | "completed") => {
    dispatcher({ type: "FILTER_VIEW", payload: view });
  };

  const handleQuerySearch = (query : string) => {
    dispatcher({ type: "SET_SEARCH", payload: query });
  }

  return {
    // Properties
    state,
    editValue,
    // Methods
    setEditValue,
    dispatcher,
    handleSubmit,
    onToggle,
    onDelete,
    onStartEdit,
    onSaveEdit,
    onCancelEdit,
    handleFilterView,
    handleQuerySearch
  };
}
