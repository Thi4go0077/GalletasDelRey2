import { useNavigate } from "react-router-dom";
import type { User } from "../../types/auth";
import { authRepository } from "../../repositories/authRepository";
import "./Navbar.css";

interface NavbarProps {
  user: User | null;
}

function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();
  const displayName = user?.name ?? "Invitado";

  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar" aria-label="Barra principal">
      <a
        className="navbar__logo"
        href="/inicio"
        aria-label="Ir al inicio de Galletas Del Rey"
      >
        <img
          className="navbar__logo-image"
          src="/logo/logo.jpeg"
          alt="Marca de Galletas Del Rey"
        />

        <span className="navbar__logo-text">
          GALLETAS DEL REY
        </span>
      </a>

      <nav
        className="navbar__menu"
        aria-label="Navegación principal"
      >
        <a href="/inicio">Inicio</a>

        <a href="/catalogo">Catálogo</a>

        <a href="/pedidos">Mis pedidos</a>

        <a href="#contacto">Contacto</a>
      </nav>

      <div className="navbar__account">
        <span
          className="navbar__username"
          aria-label={`Usuario actual: ${displayName}`}
        >
          👤 {displayName}
        </span>

        <button
          type="button"
          className="navbar__logout"
          onClick={handleLogout}
        >
          Salir
        </button>
      </div>
    </header>
  );
}

export default Navbar;