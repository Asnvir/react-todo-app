import axios, { AxiosResponse } from "axios";
import {
  CreateTaskParams,
  Task,
  ToggleTaskParams,
  UpdateTaskTextParams,
  DeleteTaskParams,
} from "../../types";
import {
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  GetTasksResponseDto,
  ToggleTaskRequestDto,
  ToggleTaskResponseDto,
  UpdateTaskTextRequestDto,
  UpdateTaskTextResponseDto,
  DeleteTaskRequestDto,
  DeleteTaskResponseDto,
} from "./types";

export class TaskService {
  baseUrl = "http://localhost:4000/todos";

  async customDelay(ms: number) {
    return new Promise<void>((resolve) => {
      return setTimeout(() => resolve(), ms);
    });
  }

  async createTask(params: CreateTaskParams): Promise<Task> {
    await this.customDelay(2000);
    //вспомни map frontend interface - to backend interface
    const dto: CreateTaskRequestDto = {
      title: params.text,
      isDone: params.isCompleted,
    };
    try {
      const {
        data: { todo: task },
      } = await axios.post<
        CreateTaskResponseDto,
        AxiosResponse<CreateTaskResponseDto>,
        CreateTaskRequestDto
      >(this.baseUrl, dto);

      // был бы маппинг сложным выносил бы в отдельные классы toEntity,toDto
      const mappedTask: Task = {
        id: task.id,
        text: task.title,
        isCompleted: task.isDone,
      };

      return mappedTask;
    } catch (error) {
      console.error(
        `[TaskService.createTask] - Error: ${
          axios.isAxiosError(error) ? error.message : error
        }`
      );
      throw new Error("Failed to create task.");
    }
  }

  async getTasks(): Promise<Task[]> {
    await this.customDelay(2000);

    try {
      const {
        data: { todos },
      } = await axios.get<GetTasksResponseDto>(this.baseUrl);

      const tasks = todos.map((todo) => {
        return { id: todo.id, text: todo.title, isCompleted: todo.isDone };
      });
      return tasks;
    } catch (error) {
      console.error(
        `[TaskService.getTasks] - Error: ${
          axios.isAxiosError(error) ? error.message : error
        }`
      );
      throw new Error("Failed to get tasks.");
    }
  }

  async toggleTask(task: ToggleTaskParams) {
    await this.customDelay(2000);

    const dto: ToggleTaskRequestDto = {
      id: task.id,
      title: task.text,
      isDone: task.isCompleted,
    };

    console.log(dto);

    try {
      const {
        data: { todo },
      } = await axios.put<
        ToggleTaskResponseDto,
        AxiosResponse<ToggleTaskResponseDto>,
        ToggleTaskRequestDto
      >(`${this.baseUrl}/${dto.id}`, dto);

      const task: Task = {
        id: todo.id,
        text: todo.title,
        isCompleted: todo.isDone,
      };

      return task;
    } catch (error) {
      console.error(
        `[TaskService.toggleTask] - Error: ${
          axios.isAxiosError(error) ? error.message : error
        }`
      );
      throw new Error(`Failed to toggle task with id:${task.id}.`);
    }
  }

  async updateTaskText(task: UpdateTaskTextParams) {
    await this.customDelay(2000);

    const dto: UpdateTaskTextRequestDto = {
      id: task.id,
      title: task.text,
      isDone: task.isCompleted,
    };

    try {
      const {
        data: { todo },
      } = await axios.put<
        UpdateTaskTextResponseDto,
        AxiosResponse<UpdateTaskTextResponseDto>,
        UpdateTaskTextRequestDto
      >(`${this.baseUrl}/${dto.id}`, dto);

      const task: Task = {
        id: todo.id,
        text: todo.title,
        isCompleted: todo.isDone,
      };

      return task;
    } catch (error) {
      console.error(
        `[TaskService.updateTaskText] - Error: ${
          axios.isAxiosError(error) ? error.message : error
        }`
      );
      throw new Error(`Failed to update task text with id:${task.id}.`);
    }
  }

  async deleteTask(task: DeleteTaskParams) {
    await this.customDelay(2000);

    const dto: DeleteTaskRequestDto = { id: task.id };
    try {
      const {
        data: { deletedId },
      } = await axios.delete<
        DeleteTaskResponseDto,
        AxiosResponse<DeleteTaskResponseDto>,
        DeleteTaskRequestDto
      >(`${this.baseUrl}/${dto.id}`);

      return {
        id: deletedId,
      };
      console.log(`Deleted id: ${id}`);
    } catch (error) {
      console.error(
        `[TaskService.deleteTask] - Error: ${
          axios.isAxiosError(error) ? error.message : error
        }`
      );
      throw new Error(`Failed to delete task text with id:${task.id}.`);
    }
  }
}
