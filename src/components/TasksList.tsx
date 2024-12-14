import { useTasks } from "../hooks/useTasks";
import { TaskForm } from "./AddTask";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  // const {
  //   tasks,
  //   createTask,
  //   isCreatingTask,
  //   toggleTaskCompleted,
  //   isTogglingTask,
  //   updateTaskText,
  //   isUpdatingTaskText,
  //   deleteTask,
  //   isDeletingTask,
  // } = useTasksOLD();

  const { tasks, isLoadingTasks, createTask, isCreatingTask } = useTasks();

  return (
    <>
      <TaskForm
        onSubmit={(text) => createTask({ text, isCompleted: false })}
        loading={isCreatingTask}
      />
      {isLoadingTasks ? (
        <>Loading tasks...</>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskItem task={task} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
