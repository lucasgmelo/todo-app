import { TaskList } from "./components/TaskList";
import { Header } from "./components/Header";
import "./styles/global.scss";
import { useEffect, useState } from "react";
import Login from "./components/Login";

export function App() {
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState("");
  const [github, setGithub] = useState("");

  function changeScreen() {
    setLogin(!login);
  }

  function getUser(myUser: string) {
    setUser(myUser);
  }

  function getGithub(myGithub: string) {
    setGithub(myGithub);
  }

  function resetData() {
    setUser("");
    setGithub("");
  }

  useEffect(() => {
    if (login) resetData();
  }, [login]);

  return (
    <div className="container">
      {login ? (
        <Login
          changeScreen={changeScreen}
          getUser={getUser}
          getGithub={getGithub}
        />
      ) : (
        <>
          <Header changeScreen={changeScreen} />
          <TaskList user={user} github={github} />
        </>
      )}
    </div>
  );
}
