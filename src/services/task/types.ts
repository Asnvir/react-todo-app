export type TaskDto = {
  id: string;
  title: string;
  isDone: boolean;
};

export type CreateTaskRequestDto = {
  title: string;
  isDone: boolean;
};

export type CreateTaskResponseDto = {
  todo: TaskDto;
};

export type GetTasksResponseDto = { todos: TaskDto[] };

export type ToggleTaskRequestDto = {
  id: string;
  title: string;
  isDone: boolean;
};

export type ToggleTaskResponseDto = {
  todo: TaskDto;
};

export type UpdateTaskTextRequestDto = {
  id: string;
  title: string;
  isDone: boolean;
};

export type UpdateTaskTextResponseDto = {
  todo: TaskDto;
};

export type DeleteTaskRequestDto = {
  id: string;
};

export type DeleteTaskResponseDto = {
  deletedId: string;
};
