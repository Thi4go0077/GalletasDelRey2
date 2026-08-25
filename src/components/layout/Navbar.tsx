import type { User } from "../../types/auth";
import "./Navbar.css";

interface NavbarProps {
  user: User | null;
}

function Navbar({ user }: NavbarProps) {
  const displayName = user?.name ?? "Invitado";

  return (
    <header className="navbar" aria-label="Barra principal">
      <div className="navbar__logo" aria-label="Logo de Galletas Del Rey">
        <span className="navbar__logo-mark">GDR</span>
        <span className="navbar__logo-text">Logo</span>
      </div>

      <div className="navbar__actions">
        <span className="navbar__username">{displayName}</span>

        <button
          className="navbar__button"
          type="button"
          aria-label="Abrir carrito"
        >
          🛒
          <span>Carrito</span>
        </button>

        <button
          className="navbar__button"
          type="button"
          aria-label="Ver notificaciones"
        >
          🔔
          <span>Notificaciones</span>
        </button>

        <button
          className="navbar__button"
          type="button"
          aria-label="Abrir perfil"
        >
          👤
          <span>Perfil</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;