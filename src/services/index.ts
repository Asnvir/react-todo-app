import { TaskService } from "./task/TaskService";

export type ServicesType = {
  taskService: TaskService;
};

export const initServices = (): ServicesType => {
  const taskService = new TaskService();

  return { taskService };
};
