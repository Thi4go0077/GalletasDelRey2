import { Link } from "react-router-dom";
import AdminNavbar from "../components/layout/AdminNavbar";
import { authRepository } from "../repositories/authRepository";
import { orderService } from "../services/orderService";
import "./AdminDashboardPage.css";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: "BOB",
  }).format(value);
}

function AdminDashboardPage() {
  const user = authRepository.getCurrentUser();
  const orders = orderService.getAll();

  const pending = orders.filter(
    (order) => order.status === "PENDIENTE"
  ).length;

  const inProgress = orders.filter(
    (order) =>
      order.status === "CONFIRMADO" ||
      order.status === "EN_PREPARACION"
  ).length;

  const delivered = orders.filter(
    (order) => order.status === "ENTREGADO"
  ).length;

  const sales = orders
    .filter((order) => order.status === "ENTREGADO")
    .reduce((total, order) => total + order.total, 0);

  if (!user || user.role !== "ADMIN") {
    return (
      <main className="admin-dashboard">
        <section className="admin-dashboard-panel">
          <h1>Acceso restringido</h1>
          <p>Inicia sesión con una cuenta administrativa autorizada.</p>
          <Link to="/admin-login">Ir al acceso administrativo</Link>
        </section>
      </main>
    );
  }

  return (
    <>
      <AdminNavbar />

      <main className="admin-dashboard">
        <section className="admin-dashboard-hero">
          <div>
            <span className="admin-dashboard-eyebrow">
              CENTRO DE CONTROL
            </span>
            <h1>Bienvenido, {user.name}</h1>
            <p>
              Gestiona los pedidos y supervisa la actividad de
              Galletas Del Rey desde un solo lugar.
            </p>
          </div>

          <div className="admin-dashboard-hero-icon" aria-hidden="true">
            👑
          </div>
        </section>

        <section className="admin-dashboard-section">
          <div className="admin-dashboard-heading">
            <div>
              <h2>Resumen operativo</h2>
              <p>Estado actual de los pedidos registrados en este navegador.</p>
            </div>

            <Link className="admin-dashboard-link" to="/admin/pedidos">
              Ver todos los pedidos →
            </Link>
          </div>

          <div className="admin-dashboard-stats">
            <article className="admin-dashboard-stat">
              <span className="admin-stat-icon">🧾</span>
              <p>Total de pedidos</p>
              <strong>{orders.length}</strong>
              <small>Pedidos registrados</small>
            </article>

            <article className="admin-dashboard-stat">
              <span className="admin-stat-icon">🟡</span>
              <p>Pendientes</p>
              <strong>{pending}</strong>
              <small>Requieren revisión</small>
            </article>

            <article className="admin-dashboard-stat">
              <span className="admin-stat-icon">📦</span>
              <p>En proceso</p>
              <strong>{inProgress}</strong>
              <small>Confirmados o en preparación</small>
            </article>

            <article className="admin-dashboard-stat">
              <span className="admin-stat-icon">✅</span>
              <p>Entregados</p>
              <strong>{delivered}</strong>
              <small>Pedidos finalizados</small>
            </article>
          </div>
        </section>

        <section className="admin-dashboard-section">
          <h2>Accesos rápidos</h2>
          <p className="admin-dashboard-section-description">
            Entra directamente a las tareas administrativas más importantes.
          </p>

          <div className="admin-dashboard-actions">
            <Link
              className="admin-dashboard-action"
              to="/admin/pedidos"
            >
              <span>📋</span>
              <div>
                <h3>Gestión de pedidos</h3>
                <p>Revisa compras, actualiza estados y elimina pedidos.</p>
              </div>
              <b>→</b>
            </Link>

            <article className="admin-dashboard-action">
              <span>💰</span>
              <div>
                <h3>Resumen de ventas entregadas</h3>
                <p>
                  Suma de pedidos que figuran como entregados.
                </p>
                <strong>{formatCurrency(sales)}</strong>
              </div>
            </article>
          </div>
        </section>

        <section className="admin-dashboard-note">
          <span>🔐</span>
          <div>
            <strong>Acceso protegido</strong>
            <p>
              El panel está reservado para cuentas con rol ADMIN.
              No se ofrece registro público de administradores.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default AdminDashboardPage;