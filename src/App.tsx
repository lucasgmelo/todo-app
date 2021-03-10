import { TaskList } from "./components/TaskList";
import { Header } from "./components/Header";
import "./styles/global.scss";

export function App() {
  return (
    <div className="container">
      <Header />
      <TaskList />
    </div>
  );
}
