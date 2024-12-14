export type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export type CreateTaskParams = {
  text: string;
  isCompleted: boolean;
};

export type ToggleTaskParams = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export type UpdateTaskTextParams = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export type DeleteTaskParams = {
  id: string;
};
