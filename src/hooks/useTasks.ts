import { useCallback, useEffect, useState } from "react";
import { useServicesContext } from "./useServicesContext";
import { useTasksContext } from "./useTasksContext";
import { CreateTaskParams } from "../types";

export const useTasks = () => {
  const { tasks, setTasks } = useTasksContext();
  const { taskService } = useServicesContext();
  const [isLoadingTasks, setLoadingTasks] = useState<boolean>(false);
  const [isCreatingTask, setCreatingTask] = useState<boolean>(false);

  const getTasks = useCallback(async (): Promise<void> => {
    setLoadingTasks(true);
    try {
      const tasks = await taskService.getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error(error);
      //TODO: toast.error(error.message)
    } finally {
      setLoadingTasks(false);
    }
  }, [setTasks, taskService]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const createTask = useCallback(
    async ({ text, isCompleted }: CreateTaskParams): Promise<void> => {
      setCreatingTask(true);
      try {
        const task = await taskService.createTask({ text, isCompleted });
        setTasks((prevTasks) => [...prevTasks, task]);
        //       dispatch({ type: "added", payload: { todo } });
        console.log(tasks);
      } catch (error) {
        console.error(error);
        //TODO: toast.error(error.message)
      } finally {
        setCreatingTask(false);
      }
    },
    [setTasks, taskService, tasks]
  );

  return {
    tasks,
    isLoadingTasks,
    createTask,
    isCreatingTask,
  };
};
