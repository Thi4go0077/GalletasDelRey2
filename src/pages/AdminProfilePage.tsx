import { Link } from "react-router-dom";
import AdminNavbar from "../components/layout/AdminNavbar";
import { authRepository } from "../repositories/authRepository";
import "./AdminProfilePage.css";

function AdminProfilePage() {
  const user = authRepository.getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return (
      <main className="admin-profile-page">
        <section className="admin-profile-card">
          <h1>Acceso restringido</h1>
          <p>Inicia sesión con una cuenta administrativa autorizada.</p>
          <Link to="/admin-login">
            Ir al acceso administrativo
          </Link>
        </section>
      </main>
    );
  }

  return (
    <>
      <AdminNavbar />

      <main className="admin-profile-page">
        <section className="admin-profile-hero">
          <div className="admin-profile-avatar">👑</div>

          <div>
            <span>CUENTA DE DIRECCIÓN</span>
            <h1>Mi perfil administrativo</h1>
            <p>Información de tu cuenta en Galletas Del Rey.</p>
          </div>
        </section>

        <section className="admin-profile-card">
          <h2>Información de la cuenta</h2>

          <div className="admin-profile-grid">
            <div>
              <span>Nombre</span>
              <strong>{user.name}</strong>
            </div>

            <div>
              <span>Usuario de acceso</span>
              <strong>{user.carnet}</strong>
            </div>

            <div>
              <span>Cargo</span>
              <strong>Administrador / Dirección</strong>
            </div>

            <div>
              <span>Permisos</span>
              <strong>Administración completa</strong>
            </div>

            <div>
              <span>Estado de sesión</span>
              <strong className="admin-profile-active">
                Sesión activa
              </strong>
            </div>
          </div>
        </section>

        <section className="admin-profile-card">
          <h2>Accesos rápidos</h2>
          <p>Consulta el panel principal o administra los pedidos.</p>

          <div className="admin-profile-actions">
            <Link to="/admin">📊 Panel principal</Link>
            <Link to="/admin/pedidos">📋 Gestionar pedidos</Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default AdminProfilePage;