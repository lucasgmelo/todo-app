import "../styles/header.scss";

interface HeaderProps {
  changeScreen: () => void;
}

export function Header(props: HeaderProps) {
  return (
    <header className="header">
      <div>
        <button type="button" onClick={props.changeScreen}>
          <img src="icons/exit.svg" alt="Sair" />
          <p>Sair</p>
        </button>
      </div>
      <img src="icons/small_logo.svg" alt="Logo" />
    </header>
  );
}
