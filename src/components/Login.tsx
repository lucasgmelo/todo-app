import { useEffect } from "react";
import useMedia from "../hooks/useMedia";
import "../styles/login.scss";

interface LoginProps {
  changeScreen: () => void;
  getUserData: () => void;
}

export default function Login(props: LoginProps) {
  const large = useMedia("(min-width: 52.5rem)");

  useEffect(() => {}, []);

  return (
    <div className="loginContainer">
      <h1>do it!</h1>
      {large ? (
        <img src="icons/desktop_logo.svg" alt="" />
      ) : (
        <img src="icons/mobile_logo.svg" alt="" />
      )}
      <div>
        <label for="user">Insira seu nome</label>
        <input id="user" type="text" />
        <label for="github">Github — opcional</label>
        <input id="github" type="text" />
        <button>Continuar</button>
      </div>
    </div>
  );
}
