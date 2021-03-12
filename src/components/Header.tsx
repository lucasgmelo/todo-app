import "../styles/header.scss";

export function Header(changeScreen: () => void) {
  return (
    <header className="header">
      <div>
        <button type="button">
          <img src="icons/exit.svg" alt="Sair" />
          <p>Sair</p>
        </button>
      </div>
      <img src="icons/small_logo.svg" alt="Logo" />
    </header>
  );
}
