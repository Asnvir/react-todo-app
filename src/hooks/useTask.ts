import { useCallback, useState } from "react";
import { useServicesContext } from "./useServicesContext";
import { useTasksContext } from "./useTasksContext";
import {
  DeleteTaskParams,
  ToggleTaskParams,
  UpdateTaskTextParams,
} from "../types";

type UseTaskProps = {
  id: string;
};

export const useTask = ({ id }: UseTaskProps) => {
  const { tasks, setTasks } = useTasksContext();
  const { taskService } = useServicesContext();
  const [isTogglingTask, setTogglingTask] = useState<boolean>(false);
  const [isUpdatingTaskText, setUpdatingTaskText] = useState<boolean>(false);
  const [isDeletingTask, setDeletingTask] = useState<boolean>(false);

  const toggleTaskCompleted = useCallback(
    async (isCompleted: boolean): Promise<void> => {
      setTogglingTask(true);
      try {
        const task = tasks.find((task) => task.id === id);
        if (!task) {
          throw new Error("Failed to find the task");
        }
        // console.log(task)
        const taskParams: ToggleTaskParams = { ...task, isCompleted };
        console.log(taskParams);

        const updatedTask = await taskService.toggleTask(taskParams);
        // console.log(updatedTask);
        //       dispatch({ type: "added", payload: { todo } });
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setTogglingTask(false);
      }
    },
    [id, setTasks, taskService, tasks]
  );

  const updateTaskText = useCallback(
    async (text: string): Promise<void> => {
      setUpdatingTaskText(true);
      try {
        const task = tasks.find((task) => task.id === id);
        if (!task) {
          throw new Error("Failed to find the task");
        }

        const taskParams: UpdateTaskTextParams = { ...task, text };

        const updatedTask = await taskService.updateTaskText(taskParams);
        //       dispatch({ type: "added", payload: { todo } });
        setTasks((prevTasks) => {
          return prevTasks.map((task) => (task.id === id ? updatedTask : task));
        });
      } catch (error) {
        console.error(error);
      } finally {
        setUpdatingTaskText(false);
      }
    },
    [id, setTasks, taskService, tasks]
  );

  const deleteTask = useCallback(async () => {
    const taskParams: DeleteTaskParams = { id };
    setDeletingTask(true);
    try {
      const { id } = await taskService.deleteTask(taskParams);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingTask(false);
    }
  }, [id, setTasks, taskService]);

  return {
    toggleTaskCompleted,
    isTogglingTask,
    updateTaskText,
    isUpdatingTaskText,
    deleteTask,
    isDeletingTask,
  };
};
