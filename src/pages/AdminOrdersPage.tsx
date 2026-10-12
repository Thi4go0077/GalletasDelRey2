import { useState } from "react";
import { Link } from "react-router-dom";

import AdminNavbar from "../components/layout/AdminNavbar";
import { authRepository } from "../repositories/authRepository";
import { orderService } from "../services/orderService";
import type { OrderStatus } from "../types/order";

import "./AdminOrdersPage.css";

type OrderFilter = "TODOS" | OrderStatus;

const statusOptions: {
  value: OrderStatus;
  label: string;
  icon: string;
}[] = [
  { value: "PENDIENTE", label: "Pendientes", icon: "🟡" },
  { value: "CONFIRMADO", label: "Confirmados", icon: "🔵" },
  { value: "EN_PREPARACION", label: "En preparación", icon: "🟠" },
  { value: "ENTREGADO", label: "Entregados", icon: "🟢" },
  { value: "RECHAZADO", label: "Rechazados", icon: "🔴" },
];

const progressSteps: OrderStatus[] = [
  "PENDIENTE",
  "CONFIRMADO",
  "EN_PREPARACION",
  "ENTREGADO",
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: "BOB",
  }).format(value);
}

function formatDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Fecha no disponible";
  }

  return new Intl.DateTimeFormat("es-BO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
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
    case "RECHAZADO":
      return "Rechazado";
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
    case "RECHAZADO":
      return "🔴";
    default:
      return "⚪";
  }
}

function getNextStatus(status: OrderStatus): OrderStatus | null {
  switch (status) {
    case "PENDIENTE":
      return "CONFIRMADO";
    case "CONFIRMADO":
      return "EN_PREPARACION";
    case "EN_PREPARACION":
      return "ENTREGADO";
    default:
      return null;
  }
}

function getNextButtonText(status: OrderStatus): string {
  switch (status) {
    case "PENDIENTE":
      return "✓ Aceptar pedido";
    case "CONFIRMADO":
      return "📦 Pasar a preparación";
    case "EN_PREPARACION":
      return "🚚 Marcar como entregado";
    default:
      return "Cambiar estado";
  }
}

function AdminOrdersPage() {
  const user = authRepository.getCurrentUser();

  const [orders, setOrders] = useState(() => orderService.getAll());
  const [filter, setFilter] = useState<OrderFilter>("TODOS");

  const refreshOrders = () => {
    setOrders(orderService.getAll());
  };

  if (!user || user.role !== "ADMIN") {
    return (
      <main className="admin-orders-page">
        <section className="admin-orders-panel">
          <h1>Acceso restringido</h1>
          <p>
            Debes iniciar sesión como administrador para ver esta página.
          </p>

          <Link className="admin-orders-back" to="/admin-login">
            Ir al inicio de sesión
          </Link>
        </section>
      </main>
    );
  }

  const handleChangeStatus = (
    orderId: string,
    currentStatus: OrderStatus,
  ) => {
    const nextStatus = getNextStatus(currentStatus);

    if (!nextStatus) {
      window.alert("Este pedido ya no admite más cambios de estado.");
      return;
    }

    const confirmed = window.confirm(
      `¿Quieres cambiar el estado del pedido a "${getStatusLabel(nextStatus)}"?`,
    );

    if (!confirmed) return;

    const updated = orderService.updateStatus(orderId, nextStatus);

    if (!updated) {
      window.alert(
        "No se encontró el pedido. Actualiza la lista e inténtalo de nuevo.",
      );
      refreshOrders();
      return;
    }

    refreshOrders();
    window.alert("El estado del pedido se actualizó correctamente.");
  };

  const handleRejectOrder = (orderId: string) => {
    const reason = window.prompt(
      "Escribe el motivo por el que se rechaza este pedido:",
    );

    if (reason === null) return;

    if (!reason.trim()) {
      window.alert("Debes escribir un motivo para rechazar el pedido.");
      return;
    }

    const confirmed = window.confirm(
      `¿Confirmas el rechazo del pedido?\n\nMotivo: ${reason.trim()}`,
    );

    if (!confirmed) return;

    const updated = orderService.updateStatus(
      orderId,
      "RECHAZADO",
      reason.trim(),
    );

    if (!updated) {
      window.alert("No se encontró el pedido.");
      refreshOrders();
      return;
    }

    refreshOrders();
    window.alert("El pedido fue rechazado correctamente.");
  };

  const handleDeleteOrder = (orderId: string) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar el pedido ${orderId}?\n\nEsta acción no se puede deshacer.`,
    );

    if (!confirmed) return;

    const deleted = orderService.delete(orderId);

    if (!deleted) {
      window.alert("No se encontró el pedido que quieres eliminar.");
      refreshOrders();
      return;
    }

    refreshOrders();
    window.alert("El pedido se eliminó correctamente.");
  };

  const handleRefresh = () => {
    refreshOrders();
    window.alert("Lista de pedidos actualizada.");
  };

  const counts: Record<OrderFilter, number> = {
    TODOS: orders.length,
    PENDIENTE: orders.filter(
      (order) => order.status === "PENDIENTE",
    ).length,
    CONFIRMADO: orders.filter(
      (order) => order.status === "CONFIRMADO",
    ).length,
    EN_PREPARACION: orders.filter(
      (order) => order.status === "EN_PREPARACION",
    ).length,
    ENTREGADO: orders.filter(
      (order) => order.status === "ENTREGADO",
    ).length,
    RECHAZADO: orders.filter(
      (order) => order.status === "RECHAZADO",
    ).length,
  };

  const visibleOrders =
    filter === "TODOS"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <>
      <AdminNavbar />

      <main className="admin-orders-page">
        <section className="admin-orders-hero">
          <p>GESTIÓN DE PEDIDOS</p>
          <h1>Administración de pedidos</h1>
          <span>
            Revisa las compras, confirma pedidos y mantén informados
            a tus clientes durante cada etapa.
          </span>
        </section>

        <section className="admin-orders-panel">
          <div className="admin-orders-title">
            <div>
              <h2>Pedidos recibidos</h2>
              <p>Total de pedidos: {orders.length}</p>
            </div>

            <button
              type="button"
              className="admin-status-button"
              onClick={handleRefresh}
            >
              ↻ Actualizar
            </button>
          </div>

          <div className="admin-order-filters">
            <button
              type="button"
              className={`admin-order-filter ${
                filter === "TODOS" ? "active" : ""
              }`}
              onClick={() => setFilter("TODOS")}
            >
              Todos <span>{counts.TODOS}</span>
            </button>

            {statusOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                className={`admin-order-filter ${
                  filter === option.value ? "active" : ""
                }`}
                onClick={() => setFilter(option.value)}
              >
                {option.icon} {option.label}{" "}
                <span>{counts[option.value]}</span>
              </button>
            ))}
          </div>

          {visibleOrders.length === 0 ? (
            <div className="admin-orders-empty">
              <div>{filter === "TODOS" ? "🧾" : "📭"}</div>

              <h2>
                {filter === "TODOS"
                  ? "No hay pedidos todavía"
                  : `No hay pedidos con estado: ${getStatusLabel(
                      filter as OrderStatus,
                    )}`}
              </h2>

              <p>
                {filter === "TODOS"
                  ? "Cuando un cliente realice una compra, aparecerá aquí."
                  : "Prueba seleccionando otro filtro para ver los pedidos."}
              </p>
            </div>
          ) : (
            <div className="admin-orders-list">
              {visibleOrders.map((order) => {
                const nextStatus = getNextStatus(order.status);
                const currentStep = progressSteps.indexOf(order.status);

                return (
                  <article
                    className="admin-order-card"
                    key={order.id}
                  >
                    <header className="admin-order-header">
                      <div>
                        <span>Pedido</span>
                        <h3>{order.id}</h3>
                        <p>{formatDate(order.date)}</p>
                      </div>

                      <div
                        className={`admin-order-status admin-order-status--${order.status.toLowerCase()}`}
                      >
                        {getStatusIcon(order.status)}{" "}
                        {getStatusLabel(order.status)}
                      </div>
                    </header>

                    <div className="admin-order-info">
                      <div>
                        <span>Cliente</span>
                        <strong>Usuario #{order.userId}</strong>
                      </div>

                      <div>
                        <span>Unidades</span>
                        <strong>
                          {order.items.reduce(
                            (total, item) => total + item.quantity,
                            0,
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>Pago</span>
                        <strong>
                          {order.paymentMethod === "cash"
                            ? "💵 Efectivo"
                            : "📱 QR"}
                        </strong>
                      </div>

                      <div>
                        <span>Total</span>
                        <strong>{formatCurrency(order.total)}</strong>
                      </div>
                    </div>

                    <div className="admin-order-products">
                      {order.items.map((item, index) => (
                        <div
                          key={`${item.productId}-${index}`}
                          className="admin-order-product"
                        >
                          <span>{item.productName}</span>
                          <span>x{item.quantity}</span>
                          <strong>{formatCurrency(item.total)}</strong>
                        </div>
                      ))}
                    </div>

                    {order.status === "RECHAZADO" ? (
                      <div className="admin-order-rejection">
                        <strong>✕ Pedido rechazado</strong>
                        <p>
                          Motivo:{" "}
                          {order.rejectionReason ||
                            "No se especificó un motivo."}
                        </p>
                      </div>
                    ) : (
                      <div className="admin-order-progress">
                        {progressSteps.map((step, index) => {
                          const completed =
                            currentStep >= 0 && index < currentStep;
                          const active = index === currentStep;

                          return (
                            <div
                              className={`admin-progress-step ${
                                completed ? "complete" : ""
                              } ${active ? "active" : ""}`}
                              key={step}
                            >
                              <span>{getStatusIcon(step)}</span>
                              <small>{getStatusLabel(step)}</small>

                              {index < progressSteps.length - 1 && (
                                <span aria-hidden="true">→</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <footer className="admin-order-footer">
                      <div className="admin-order-actions">
                        {nextStatus && (
                          <button
                            type="button"
                            className="admin-status-button"
                            onClick={() =>
                              handleChangeStatus(order.id, order.status)
                            }
                          >
                            {getNextButtonText(order.status)}
                          </button>
                        )}

                        {order.status === "PENDIENTE" && (
                          <button
                            type="button"
                            className="admin-reject-button"
                            onClick={() => handleRejectOrder(order.id)}
                          >
                            ✕ Rechazar pedido
                          </button>
                        )}

                        <button
                          type="button"
                          className="admin-reject-button"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          🗑 Eliminar pedido
                        </button>
                      </div>

                      {order.status === "ENTREGADO" && (
                        <p className="admin-order-finished">
                          ✓ Pedido entregado y finalizado.
                        </p>
                      )}
                    </footer>
                  </article>
                );
              })}
            </div>
          )}

          <Link className="admin-orders-back" to="/admin">
            ← Volver al panel principal
          </Link>
        </section>
      </main>
    </>
  );
}

export default AdminOrdersPage;