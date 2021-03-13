import useMedia from "../hooks/useMedia";
import "../styles/login.scss";

interface LoginProps {
  changeScreen: () => void;
  getGithub: (myGithub: string) => void;
  getUser: (myUser: string) => void;
}

export default function Login(props: LoginProps) {
  const large = useMedia("(min-width: 52.5rem)");

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
        <input
          required
          id="user"
          type="text"
          onChange={(e) => {
            props.getUser(e.target.value);
          }}
        />
        <label htmlFor="github">Github — opcional</label>
        <input
          id="github"
          type="text"
          onChange={(e) => {
            props.getGithub(e.target.value);
          }}
        />
        <button type="submit">Continuar</button>
      </form>
    </div>
  );
}
