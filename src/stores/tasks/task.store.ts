import { create, StateCreator } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { devtools, persist } from "zustand/middleware";
import type { Task, TaskStatus } from "../../interface";
import { customSessionStorage } from "../storages/session.storage";
//import { produce } from "immer";
import { immer } from "zustand/middleware/immer";

interface TaskState {
  //properties
  draggingTaskId?: string;
  tasks: Record<string, Task>;
  //method
  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;
  setDraggingTaskId: (TaskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
  getTasksCount: () => number;
}

const TaskStoreApi: StateCreator<
  TaskState,
  [
    ["zustand/devtools", never],
    ["zustand/persist", unknown],
    ["zustand/immer", never]
  ]
> = (set, get) => ({
  //propriety
  fraggingTaskId: undefined,
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "done" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "pending" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "done" },
    "ABC-5": { id: "ABC-5", title: "Task 5", status: "done" },
    "ABC-6": { id: "ABC-6", title: "Task 6", status: "pending" },
  },
  //methods
  getTaskByStatus: (status: TaskStatus) => {
    return Object.values(get().tasks).filter((task) => task.status === status);
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidv4(), title, status };
    //? immer zustand
    set(
      (state) => {
        state.tasks[newTask.id] = newTask;
      },
      false,
      "addTask"
    );
    //? native zustand
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   },
    // }));
    //set(
    //? procede
    //  produce((state: TaskState) => {
    //    state.tasks[newTask.id] = newTask;
    //  })
    //);
  },

  setDraggingTaskId: (TaskId: string) => {
    set({ draggingTaskId: TaskId }, false, "setDraggingTaskId");
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined }, false, "removeDraggingTaskId");
  },

  changeTaskStatus: (taskId: string, newStatus: TaskStatus) => {
    set(state =>{
        state.tasks[taskId].status = newStatus;
        },
      false,
      "changeProgress"
    );
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },

  getTasksCount: () => {
    return Object.values(get().tasks).length;
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(immer(TaskStoreApi), {
      name: "taskStore",
      storage: customSessionStorage,
    })
  )
);
