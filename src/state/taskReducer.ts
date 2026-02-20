export interface Task {
  id: number;
  task: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  editingTaskId: number | null;
  completed: number;
  pending: number;
  filter_view: string;
  search_query: string;
}

export type taskAction =
  | { type: "ADD_TASK"; payload: string }
  | { type: "TOGGLE_TASK"; payload: number }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "START_EDIT"; payload: number }
  | { type: "SAVE_EDIT"; payload: { item: string; id: number } }
  | { type: "CANCEL_EDIT"; payload: null }
  | { type: "FILTER_VIEW"; payload: "all" | "pending" | "completed" }
  | { type: "SET_SEARCH"; payload: string };

export const getInitialStateTask = () => {
  const localStorageState = localStorage.getItem("tasks-state");
  if (!localStorageState) {
    return {
      tasks: [],
      editingTaskId: null,
      completed: 0,
      pending: 0,
      filter_view: "all",
      search_query: "",
    };
  } else {
    return JSON.parse(localStorageState);
  }
};

export const taskReducer = (state: TaskState, action: taskAction) => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        id: Date.now(),
        task: action.payload,
        completed: false,
      };

      return {
        ...state,
        tasks: [...state.tasks, newTask],
        pending: [...state.tasks, newTask].filter((task) => !task.completed)
          .length,
      };
    }
    case "TOGGLE_TASK": {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });

      return {
        ...state,
        tasks: updatedTasks,
        completed: updatedTasks.filter((task) => task.completed).length,
        pending: updatedTasks.filter((task) => !task.completed).length,
      };
    }
    case "DELETE_TASK": {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload,
      );

      return {
        ...state,
        tasks: updatedTasks,
        completed: updatedTasks.filter((task) => task.completed).length,
        pending: updatedTasks.filter((task) => !task.completed).length,
      };
    }
    case "START_EDIT": {
      return {
        ...state,
        editingTaskId: action.payload,
      };
    }
    case "SAVE_EDIT": {
      const { item, id } = action.payload;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            task: item,
          };
        }
        return task;
      });

      return {
        ...state,
        tasks: updatedTasks,
        editingTaskId: null,
      };
    }
    case "CANCEL_EDIT": {
      return {
        ...state,
        editingTaskId: action.payload,
      };
    }
    case "FILTER_VIEW": {
      return {
        ...state,
        filter_view: action.payload,
      };
    }
    case "SET_SEARCH": {
      return {
        ...state,
        search_query: action.payload,
      };
    }

    default:
      return state;
  }
};
