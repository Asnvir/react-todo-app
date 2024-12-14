import { useContext } from "react";
import { TasksContext } from "../contexts/tasks/TasksContext";

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("Missing TasksContext");
  }

  return context;
};
