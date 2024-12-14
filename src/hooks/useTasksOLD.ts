// import { useCallback, useEffect, useState } from "react";
// import { useServicesContext } from "./useServicesContext";
// import {
//   Task,
//   ToggleTaskParams,
//   UpdateTaskTextParams,
//   DeleteTaskParams,
//   CreateTaskParams,
// } from "../types";

// export const useTasksOLD = () => {
//   const { taskService } = useServicesContext();

//   const [tasks, setTasks] = useState<Task[]>([]);

//   const [isLoadingTasks, setLoadingTasks] = useState<boolean>(false);
//   const [isCreatingTask, setCreatingTask] = useState<boolean>(false);
//   const [isTogglingTask, setTogglingTask] = useState<boolean>(false);
//   const [isUpdatingTaskText, setUpdatingTaskText] = useState<boolean>(false);
//   const [isDeletingTask, setDeletingTask] = useState<boolean>(false);

//   const getTasks = useCallback(async (): Promise<void> => {
//     setLoadingTasks(true);
//     try {
//       const tasks = await taskService.getTasks();
//       setTasks(tasks);
//     } catch (error) {
//       console.error(error);
//       //TODO: toast.error(error.message)
//     } finally {
//       setLoadingTasks(false);
//     }
//   }, [taskService]);

//   useEffect(() => {
//     getTasks();
//   }, [getTasks]);

//   const createTask = useCallback(
//     async ({ text, isCompleted }: CreateTaskParams): Promise<void> => {
//       setCreatingTask(true);
//       try {
//         const task = await taskService.createTask({ text, isCompleted });
//         console.log(task);
//         setTasks((prevTasks) => [...prevTasks, task]);
//         //       dispatch({ type: "added", payload: { todo } });
//         console.log(tasks);
//       } catch (error) {
//         console.error(error);
//         //TODO: toast.error(error.message)
//       } finally {
//         setCreatingTask(false);
//       }
//     },
//     [taskService, tasks]
//   );

//   const toggleTaskCompleted = useCallback(
//     async ({
//       id,
//       isCompleted,
//     }: {
//       id: string;
//       isCompleted: boolean;
//     }): Promise<void> => {
//       setTogglingTask(true);
//       try {
//         const task = tasks.find((task) => task.id === id);
//         if (!task) {
//           throw new Error("Failed to find the task");
//         }

//         const taskParams: ToggleTaskParams = { ...task, isCompleted };

//         const updatedTask = await taskService.toggleTask(taskParams);
//         //       dispatch({ type: "added", payload: { todo } });
//         setTasks((prevTasks) => {
//           return prevTasks.map((task) => (task.id === id ? updatedTask : task));
//         });
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setTogglingTask(false);
//       }
//     },
//     [taskService, tasks]
//   );

//   const updateTaskText = useCallback(
//     async ({ id, text }: { id: string; text: string }): Promise<void> => {
//       setUpdatingTaskText(true);
//       try {
//         const task = tasks.find((task) => task.id === id);
//         if (!task) {
//           throw new Error("Failed to find the task");
//         }

//         const taskParams: UpdateTaskTextParams = { ...task, text };

//         const updatedTask = await taskService.updateTaskText(taskParams);
//         //       dispatch({ type: "added", payload: { todo } });
//         setTasks((prevTasks) => {
//           return prevTasks.map((task) => (task.id === id ? updatedTask : task));
//         });
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setUpdatingTaskText(false);
//       }
//     },
//     [taskService, tasks]
//   );

//   const deleteTask = useCallback(
//     async ({ id }: { id: string }) => {
//       const taskParams: DeleteTaskParams = { id };
//       setDeletingTask(true);
//       try {
//         const { id } = await taskService.deleteTask(taskParams);
//         setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setDeletingTask(false);
//       }
//     },
//     [taskService]
//   );

//   return {
//     tasks,
//     getTasks,
//     isLoadingTasks,
//     createTask,
//     isCreatingTask,
//     toggleTaskCompleted,
//     isTogglingTask,
//     updateTaskText,
//     isUpdatingTaskText,
//     deleteTask,
//     isDeletingTask,
//   };
// };
