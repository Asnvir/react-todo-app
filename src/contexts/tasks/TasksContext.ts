import { createContext, Dispatch, SetStateAction } from "react";
import { Task } from "../../types";

type TasksContextType = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
} | null;

export const TasksContext = createContext<TasksContextType>(null);
