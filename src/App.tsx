import { TaskList } from "./components/TaskList";
import { Header } from "./components/Header";
import "./styles/global.scss";
import { useState } from "react";
import Login from "./components/Login";

export function App() {
  const [login, setLogin] = useState(true);

  function changeScreen() {
    setLogin(!login);
  }

  return (
    <div className="container">
      {login ? (
        <Login />
      ) : (
        <>
          <Header />
          <TaskList />
        </>
      )}
    </div>
  );
}
