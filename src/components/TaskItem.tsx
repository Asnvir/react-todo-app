import { useState } from "react";
import { Task } from "../types";
import { useTask } from "../hooks/useTask";

type TaskItemProps = {
  task: Task;
};

//dump component т.к. не знает про бизнесс логику. только ручки дергает и можно использовать в контексте любого приложения
export const TaskItem = ({
  task: { id, text, isCompleted },
}: TaskItemProps) => {
  const {
    toggleTaskCompleted: onCompletedChange,
    isTogglingTask,
    updateTaskText: onTaskTextSubmit,
    isUpdatingTaskText,
    deleteTask: onDeleteCLick,
    isDeletingTask,
  } = useTask({ id });

  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  const handleSaveClick = () => {
    onTaskTextSubmit(currentText);
    setIsEditing(false);
  };

  const handleEditTask = () => {
    setIsEditing(true);
  };

  return (
    <label htmlFor="">
      {isTogglingTask ? (
        <>Loading</>
      ) : (
        <input
          type="checkbox"
          checked={isCompleted}
          disabled={isTogglingTask}
          onChange={(event) => onCompletedChange(event.target.checked)}
        />
      )}
      {isEditing ? (
        <>
          <input
            type="text"
            value={currentText}
            disabled={isUpdatingTaskText}
            onChange={(event) => setCurrentText(event.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          {text}
          <button onClick={handleEditTask}>Edit</button>
        </>
      )}
      <button onClick={onDeleteCLick} disabled={isDeletingTask}>
        Delete
      </button>
    </label>
  );
};
