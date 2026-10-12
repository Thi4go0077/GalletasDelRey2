
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import { authRepository } from "../repositories/authRepository";
import { orderService } from "../services/orderService";

import type { Order, OrderStatus } from "../types/order";

import "./OrdersPage.css";

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

const steps: {
  status: OrderStatus;
  label: string;
  icon: string;
}[] = [
  { status: "PENDIENTE", label: "Recibido", icon: "🧾" },
  { status: "CONFIRMADO", label: "Confirmado", icon: "✓" },
  { status: "EN_PREPARACION", label: "Preparación", icon: "📦" },
  { status: "ENTREGADO", label: "Entregado", icon: "✓" },
];

function getStatusMessage(status: OrderStatus): {
  title: string;
  description: string;
  icon: string;
  className: string;
} {
  switch (status) {
    case "PENDIENTE":
      return {
        title: "Tu pedido está pendiente",
        description:
          "Recibimos tu pedido. Estamos esperando que nuestro equipo lo revise y lo confirme.",
        icon: "⏳",
        className: "pending",
      };

    case "CONFIRMADO":
      return {
        title: "¡Tu pedido fue aceptado!",
        description:
          "El administrador confirmó tu pedido. Pronto comenzaremos a prepararlo.",
        icon: "✓",
        className: "confirmed",
      };

    case "EN_PREPARACION":
      return {
        title: "Estamos preparando tu pedido",
        description:
          "Nuestro equipo está preparando tus productos para que estén listos para la entrega.",
        icon: "📦",
        className: "preparing",
      };

    case "ENTREGADO":
      return {
        title: "¡Pedido entregado con éxito!",
        description:
          "Tu pedido fue marcado como entregado. ¡Gracias por elegir Galletas Del Rey!",
        icon: "✓",
        className: "delivered",
      };

    case "RECHAZADO":
      return {
        title: "Lo sentimos, tu pedido fue rechazado",
        description:
          "No podremos completar este pedido. Consulta el motivo indicado por nuestro equipo.",
        icon: "✕",
        className: "rejected",
      };
  }
}

function OrderProgress({ status }: { status: OrderStatus }) {
  const rejected = status === "RECHAZADO";
  const currentIndex = steps.findIndex(
    (step) => step.status === status,
  );

  return (
    <div
      className={`order-tracking ${rejected ? "order-tracking--rejected" : ""}`}
      aria-label={`Progreso del pedido: ${status}`}
    >
      {steps.map((step, index) => {
        const complete = !rejected && index < currentIndex;
        const current = !rejected && index === currentIndex;
        const future = !rejected && index > currentIndex;

        return (
          <div
            key={step.status}
            className={[
              "order-tracking__step",
              complete ? "is-complete" : "",
              current ? "is-current" : "",
              future ? "is-future" : "",
            ].filter(Boolean).join(" ")}
          >
            <div className="order-tracking__marker">
              {complete ? "✓" : step.icon}
            </div>

            <span className="order-tracking__label">
              {step.label}
            </span>

            {index < steps.length - 1 && (
              <div className="order-tracking__connector">
                <span
                  className={
                    !rejected && index < currentIndex
                      ? "is-filled"
                      : ""
                  }
                />
              </div>
            )}
          </div>
        );
      })}

      {rejected && (
        <p className="order-tracking__rejected-note">
          ✕ Este pedido no continuará su proceso.
        </p>
      )}
    </div>
  );
}

function OrderStatusCard({ order }: { order: Order }) {
  const message = getStatusMessage(order.status);

  return (
    <section
      className={`order-message order-message--${message.className}`}
      aria-live="polite"
    >
      <div className="order-message__icon" aria-hidden="true">
        {message.icon}
      </div>

      <div className="order-message__content">
        <h3>{message.title}</h3>
        <p>{message.description}</p>

        {order.status === "RECHAZADO" && (
          <div className="order-message__reason">
            <strong>Motivo del rechazo</strong>
            <p>
              {order.rejectionReason ||
                "No se especificó un motivo. Contacta con nuestro equipo para más información."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function OrdersPage() {
  const user = authRepository.getCurrentUser();

  const [orders, setOrders] = useState<Order[]>(() =>
    user ? orderService.getByUser(user.id) : [],
  );

  useEffect(() => {
    if (!user) return;

    const refreshOrders = () => {
      setOrders(orderService.getByUser(user.id));
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        refreshOrders();
      }
    };

    window.addEventListener("focus", refreshOrders);
    window.addEventListener("storage", refreshOrders);
    document.addEventListener("visibilitychange", handleVisibility);

    refreshOrders();

    return () => {
      window.removeEventListener("focus", refreshOrders);
      window.removeEventListener("storage", refreshOrders);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [user?.id]);

  if (!user) return null;

  return (
    <>
      <Navbar user={user} />

      <main className="orders-page">
        <section className="orders-hero">
          <p className="orders-hero__eyebrow">
            Seguimiento de compras
          </p>

          <h1>Mis pedidos</h1>

          <p>
            Consulta el estado de tus compras y sigue cada etapa
            hasta la entrega.
          </p>
        </section>

        <section className="orders-panel">
          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <article className="order-card" key={order.id}>
                  <header className="order-card__header">
                    <div>
                      <span className="order-card__label">
                        Número de pedido
                      </span>

                      <h2>{order.id}</h2>

                      <p>{formatDate(order.date)}</p>
                    </div>
                  </header>

                  <OrderStatusCard order={order} />

                  <div className="order-card__tracking">
                    <h3>Seguimiento de tu pedido</h3>
                    <OrderProgress status={order.status} />
                  </div>

                  <div className="order-card__items">
                    {order.items.map((item) => (
                      <div
                        className="order-item"
                        key={item.productId}
                      >
                        <div>
                          <strong>{item.productName}</strong>
                          <span>Cantidad: {item.quantity}</span>
                        </div>

                        <strong>{formatCurrency(item.total)}</strong>
                      </div>
                    ))}
                  </div>

                  <footer className="order-card__footer">
                    <div>
                      <span>Método de pago</span>
                      <strong>
                        {order.paymentMethod === "cash"
                          ? "💵 Efectivo"
                          : "📱 QR"}
                      </strong>
                    </div>

                    <div className="order-card__total">
                      <span>Total</span>
                      <strong>{formatCurrency(order.total)}</strong>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <div className="orders-empty">
              <div className="orders-empty__icon">🧾</div>

              <h2>Todavía no tienes pedidos</h2>

              <p>
                Cuando realices una compra, podrás seguir aquí
                su estado y su progreso.
              </p>

              <Link className="orders-empty__button" to="/catalogo">
                🍪 Ir al catálogo
              </Link>
            </div>
          )}

          <Link className="orders-back-link" to="/inicio">
            ← Volver al inicio
          </Link>
        </section>
      </main>
    </>
  );
}

export default OrdersPage;