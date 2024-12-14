import "./App.css";
import { TaskList } from "./components/TasksList";
import { ServicesProvider } from "./contexts/services/ServiceProvider";
import { TasksProvider } from "./contexts/tasks/TasksProvider";

export const App = () => {
  return (
    <ServicesProvider>
      <TasksProvider>
        <TaskList />
      </TasksProvider>
    </ServicesProvider>
  );
};
