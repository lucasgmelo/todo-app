import useMedia from "../hooks/useMedia";
import "../styles/login.scss";

export default function Login() {
  const large = useMedia("(min-width: 52.5rem)");

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
