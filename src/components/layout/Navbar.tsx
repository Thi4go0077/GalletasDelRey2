import type { User } from "../../types/auth";
import "./Navbar.css";

interface NavbarProps {
  user: User | null;
}

function Navbar({ user }: NavbarProps) {
  const displayName = user?.name ?? "Invitado";

  return (
    <header className="navbar" aria-label="Barra principal">
      <a className="navbar__logo" href="/" aria-label="Ir al inicio de Galletas Del Rey">
        <img
          className="navbar__logo-image"
          src="/logo/logo.jpeg"
          alt="Marca de Galletas Del Rey"
        />
        <span className="navbar__logo-text">GALLETAS DEL REY</span>
      </a>

      <nav className="navbar__menu" aria-label="Navegación principal">
        <a href="/">Inicio</a>
        <a href="/catalogo">Catálogo</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <span className="navbar__username" aria-label={`Usuario actual: ${displayName}`}>
        {displayName}
      </span>
    </header>
  );
}

export default Navbar;
