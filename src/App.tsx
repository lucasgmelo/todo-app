import { TaskList } from "./components/TaskList";
import { Header } from "./components/Header";
import "./styles/global.scss";
import { useState } from "react";
import Login from "./components/Login";

interface HeaderProps {
  changeScreen: () => void;
}

interface LoginProps extends HeaderProps {
  getUserData: () => void;
}

interface TaskListProps {
  user: string;
  userPhoto: string;
}

export function App() {
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  function changeScreen() {
    setLogin(!login);
  }

  function getUserData(myUser: string, photo: string) {
    setUser(myUser);
    setUserPhoto(photo);
  }

  return (
    <div className="container">
      {login ? (
        <Login<LoginProps>
          changeScreen={changeScreen}
          getUserData={getUserData}
        />
      ) : (
        <>
          <Header<HeaderProps> changeScreen={changeScreen} />
          <TaskList<TaskListProps> user={user} userPhoto={userPhoto} />
        </>
      )}
    </div>
  );
}
