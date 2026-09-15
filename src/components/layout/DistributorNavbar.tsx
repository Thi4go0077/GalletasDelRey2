import { Link, useNavigate } from "react-router-dom";

import type { User } from "../../types/auth";

import { authRepository } from "../../repositories/authRepository";

import "./DistributorNavbar.css";

interface DistributorNavbarProps {
  user: User | null;
}

function DistributorNavbar({
  user,
}: DistributorNavbarProps) {
  const navigate = useNavigate();

  const displayName = user?.name ?? "Distribuidor";

  const handleLogout = () => {
    authRepository.logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header
      className="distributor-navbar"
      aria-label="Menú de distribuidores"
    >
      <Link
        className="distributor-navbar__logo"
        to="/distribuidor"
      >
        <img
          className="distributor-navbar__logo-image"
          src="/logo/logo.jpeg"
          alt="Galletas Del Rey"
        />

        <div>
          <span className="distributor-navbar__logo-text">
            GALLETAS DEL REY
          </span>

          <span className="distributor-navbar__subtitle">
            ÁREA DE DISTRIBUIDORES
          </span>
        </div>
      </Link>

      <nav
        className="distributor-navbar__menu"
        aria-label="Navegación de distribuidores"
      >
        <Link to="/distribuidor">
          🏠 Inicio
        </Link>

        <Link to="/distribuidor/lotes">
          📦 Comprar por lotes
        </Link>

        <Link to="/distribuidor/pedidos">
          🧾 Mis pedidos
        </Link>

        <Link to="/distribuidor/beneficios">
          🎁 Mis beneficios
        </Link>
      </nav>

      <div className="distributor-navbar__account">
        <span>
          🚚 {displayName}
        </span>

        <button
          type="button"
          onClick={handleLogout}
        >
          Salir
        </button>
      </div>
    </header>
  );
}

export default DistributorNavbar;