import { useEffect } from "react";
import useMedia from "../hooks/useMedia";
import "../styles/login.scss";

interface LoginProps {
  changeScreen: () => void;
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
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.changeScreen();
        }}
      >
        <label htmlFor="user">Insira seu nome</label>
        <input required id="user" type="text" />
        <label htmlFor="github">Github — opcional</label>
        <input required id="github" type="text" />
        <button type="submit">Continuar</button>
      </form>
    </div>
  );
}
