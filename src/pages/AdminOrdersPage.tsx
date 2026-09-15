import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import { authRepository } from "../repositories/authRepository";
import { orderService } from "../services/orderService";

import type { OrderStatus } from "../types/order";

import "./AdminOrdersPage.css";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-BO", {
    currency: "BOB",
    style: "currency",
  }).format(value);
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("es-BO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function getStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "PENDIENTE":
      return "Pendiente";
    case "CONFIRMADO":
      return "Confirmado";
    case "EN_PREPARACION":
      return "En preparación";
    case "ENTREGADO":
      return "Entregado";
    default:
      return status;
  }
}

function getStatusIcon(status: OrderStatus): string {
  switch (status) {
    case "PENDIENTE":
      return "🟡";
    case "CONFIRMADO":
      return "🔵";
    case "EN_PREPARACION":
      return "🟠";
    case "ENTREGADO":
      return "🟢";
    default:
      return "⚪";
  }
}

function getNextStatus(
  status: OrderStatus,
): OrderStatus | null {
  switch (status) {
    case "PENDIENTE":
      return "CONFIRMADO";

    case "CONFIRMADO":
      return "EN_PREPARACION";

    case "EN_PREPARACION":
      return "ENTREGADO";

    case "ENTREGADO":
      return null;

    default:
      return null;
  }
}

function getNextButtonText(
  status: OrderStatus,
): string {
  switch (status) {
    case "PENDIENTE":
      return "✓ Confirmar pedido";

    case "CONFIRMADO":
      return "📦 Pasar a preparación";

    case "EN_PREPARACION":
      return "🚚 Marcar como entregado";

    case "ENTREGADO":
      return "✓ Pedido finalizado";

    default:
      return "Cambiar estado";
  }
}

function AdminOrdersPage() {
  const user = authRepository.getCurrentUser();

  const [orders, setOrders] = useState(() =>
    orderService.getAll(),
  );

  if (!user) {
    return null;
  }

  if (user.role !== "ADMIN") {
    return null;
  }

  const handleChangeStatus = (
    orderId: string,
    currentStatus: OrderStatus,
  ) => {
    const nextStatus = getNextStatus(currentStatus);

    if (!nextStatus) {
      return;
    }

    orderService.updateStatus(
      orderId,
      nextStatus,
    );

    setOrders(orderService.getAll());
  };

  return (
    <>
      <Navbar user={user} />

      <main className="admin-orders-page">
        <section className="admin-orders-hero">
          <p>GESTIÓN DE PEDIDOS</p>

          <h1>Administración de pedidos</h1>

          <span>
            Controla el estado de todos los pedidos
            realizados por los clientes.
          </span>
        </section>

        <section className="admin-orders-panel">
          <div className="admin-orders-title">
            <div>
              <h2>Pedidos recibidos</h2>

              <p>
                Total de pedidos: {orders.length}
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="admin-orders-empty">
              <div>🧾</div>

              <h2>No hay pedidos todavía</h2>

              <p>
                Cuando un cliente realice una compra,
                aparecerá aquí.
              </p>
            </div>
          ) : (
            <div className="admin-orders-list">
              {orders.map((order) => {
                const nextStatus = getNextStatus(
                  order.status,
                );

                return (
                  <article
                    className="admin-order-card"
                    key={order.id}
                  >
                    <header className="admin-order-header">
                      <div>
                        <span>
                          Pedido
                        </span>

                        <h3>{order.id}</h3>

                        <p>
                          {formatDate(order.date)}
                        </p>
                      </div>

                      <div
                        className={`admin-order-status admin-order-status--${order.status.toLowerCase()}`}
                      >
                        {getStatusIcon(
                          order.status,
                        )}

                        {getStatusLabel(
                          order.status,
                        )}
                      </div>
                    </header>

                    <div className="admin-order-info">
                      <div>
                        <span>Cliente</span>

                        <strong>
                          Usuario #{order.userId}
                        </strong>
                      </div>

                      <div>
                        <span>Productos</span>

                        <strong>
                          {order.items.reduce(
                            (total, item) =>
                              total + item.quantity,
                            0,
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>Pago</span>

                        <strong>
                          {order.paymentMethod ===
                          "cash"
                            ? "💵 Efectivo"
                            : "📱 QR"}
                        </strong>
                      </div>

                      <div>
                        <span>Total</span>

                        <strong>
                          {formatCurrency(
                            order.total,
                          )}
                        </strong>
                      </div>
                    </div>

                    <div className="admin-order-products">
                      {order.items.map((item) => (
                        <div
                          key={item.productId}
                          className="admin-order-product"
                        >
                          <span>
                            {item.productName}
                          </span>

                          <span>
                            x{item.quantity}
                          </span>

                          <strong>
                            {formatCurrency(
                              item.total,
                            )}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <footer className="admin-order-footer">
                      <div className="admin-order-progress">
                        <span
                          className={
                            order.status ===
                            "PENDIENTE"
                              ? "active"
                              : ""
                          }
                        >
                          🟡
                        </span>

                        <span>→</span>

                        <span
                          className={
                            order.status ===
                              "CONFIRMADO" ||
                            order.status ===
                              "EN_PREPARACION" ||
                            order.status ===
                              "ENTREGADO"
                              ? "active"
                              : ""
                          }
                        >
                          🔵
                        </span>

                        <span>→</span>

                        <span
                          className={
                            order.status ===
                              "EN_PREPARACION" ||
                            order.status ===
                              "ENTREGADO"
                              ? "active"
                              : ""
                          }
                        >
                          🟠
                        </span>

                        <span>→</span>

                        <span
                          className={
                            order.status ===
                            "ENTREGADO"
                              ? "active"
                              : ""
                          }
                        >
                          🟢
                        </span>
                      </div>

                      <button
                        type="button"
                        className="admin-status-button"
                        disabled={!nextStatus}
                        onClick={() =>
                          handleChangeStatus(
                            order.id,
                            order.status,
                          )
                        }
                      >
                        {getNextButtonText(
                          order.status,
                        )}
                      </button>
                    </footer>
                  </article>
                );
              })}
            </div>
          )}

          <Link
            className="admin-orders-back"
            to="/inicio"
          >
            ← Volver al inicio
          </Link>
        </section>
      </main>
    </>
  );
}

export default AdminOrdersPage;