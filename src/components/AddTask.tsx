import { useState } from "react";

type TaskFormProps = {
  onSubmit: (text: string) => void;
  loading: boolean;
};

// сделать тупым компонентом
export const TaskForm = ({ onSubmit, loading }: TaskFormProps) => {
  const [text, setText] = useState("");

  const handleClick = () => {
    onSubmit(text);
  };

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Add"}
      </button>
    </>
  );
};
