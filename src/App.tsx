import { TaskList } from "./components/TaskList";
import { Header } from "./components/Header";
import "./styles/global.scss";
import { useState } from "react";
import Login from "./components/Login";

export function App() {
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState("Lucas Melo");
  const [github, setGithub] = useState("");

  function changeScreen() {
    setLogin(!login);
  }

  function getUserData(myUser: string, myGithub: string) {
    setUser(myUser);
    setGithub(myGithub);
  }

  return (
    <div className="container">
      {login ? (
        <Login changeScreen={changeScreen} />
      ) : (
        <>
          <Header changeScreen={changeScreen} />
          <TaskList user={user} github={github} />
        </>
      )}
    </div>
  );
}
