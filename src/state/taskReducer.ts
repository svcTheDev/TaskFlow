interface Task {
  id: number;
  task: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

type taskAction = { type: "ADD_TASK"; payload: string };
// | {type: "TOGGLE_TASK", payload: number}
// | {type: "EDIT_TASK", payload: string, id}
// | {type: "ADD_TASK", payload: string}

export const getInitialStateTask = () => {
  const localStorageState = localStorage.getItem("tasks-state");
  if (!localStorageState) {
    return {
      tasks: []
    };
  } else {
    return JSON.parse(localStorageState)
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
      };
    }
    default:
      return state;
  }
};
