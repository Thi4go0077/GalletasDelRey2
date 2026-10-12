
import { NavLink, useNavigate } from "react-router-dom";
import { authRepository } from "../../repositories/authRepository";
import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  const handleLogout = () => {
    authRepository.logout();
    navigate("/admin-login", { replace: true });
  };

  return (
    <header className="admin-navbar">
      <NavLink to="/admin/pedidos" className="admin-navbar__brand">
        <img src="/logo/logo.jpeg" alt="Galletas Del Rey" />
        <div>
          <strong>GALLETAS DEL REY</strong>
          <span>Panel administrativo</span>
        </div>
      </NavLink>

      <nav className="admin-navbar__links">
        <NavLink to="/admin/pedidos">
          📋 Gestión de pedidos
        </NavLink>
      </nav>

      <div className="admin-navbar__account">
        <div className="admin-navbar__user">
          <span className="admin-navbar__avatar">👑</span>
          <div>
            <strong>{user?.name ?? "Administrador"}</strong>
            <span>Administrador</span>
          </div>
        </div>

        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default AdminNavbar;
