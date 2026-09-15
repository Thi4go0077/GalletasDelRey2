import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";

import { authRepository } from "../repositories/authRepository";

import { orderService } from "../services/orderService";

import type { OrderStatus } from "../types/order";

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

function OrdersPage() {
  const user = authRepository.getCurrentUser();

  if (!user) {
    return null;
  }

  const orders = orderService.getByUser(user.id);

  return (
    <>
      <Navbar user={user} />

      <main className="orders-page">
        <section className="orders-hero">
          <p className="orders-hero__eyebrow">
            Historial de compras
          </p>

          <h1>Mis pedidos</h1>

          <p>
            Consulta tus pedidos realizados y revisa
            su estado.
          </p>
        </section>

        <section className="orders-panel">
          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <article
                  className="order-card"
                  key={order.id}
                >
                  <header className="order-card__header">
                    <div>
                      <span className="order-card__label">
                        Pedido
                      </span>

                      <h2>{order.id}</h2>

                      <p>
                        {formatDate(order.date)}
                      </p>
                    </div>

                    <div
                      className={`order-status order-status--${order.status.toLowerCase()}`}
                    >
                      <span>
                        {getStatusIcon(
                          order.status,
                        )}
                      </span>

                      {getStatusLabel(
                        order.status,
                      )}
                    </div>
                  </header>

                  <div className="order-card__items">
                    {order.items.map((item) => (
                      <div
                        className="order-item"
                        key={item.productId}
                      >
                        <div>
                          <strong>
                            {item.productName}
                          </strong>

                          <span>
                            Cantidad: {item.quantity}
                          </span>
                        </div>

                        <strong>
                          {formatCurrency(
                            item.total,
                          )}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <footer className="order-card__footer">
                    <div>
                      <span>
                        Método de pago
                      </span>

                      <strong>
                        {order.paymentMethod ===
                        "cash"
                          ? "💵 Efectivo"
                          : "📱 QR"}
                      </strong>
                    </div>

                    <div className="order-card__total">
                      <span>
                        Total
                      </span>

                      <strong>
                        {formatCurrency(
                          order.total,
                        )}
                      </strong>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <div className="orders-empty">
              <div className="orders-empty__icon">
                🧾
              </div>

              <h2>
                Todavía no tienes pedidos
              </h2>

              <p>
                Cuando realices una compra,
                aparecerá aquí junto con su
                estado y detalle.
              </p>

              <Link
                className="orders-empty__button"
                to="/catalogo"
              >
                🍪 Ir al catálogo
              </Link>
            </div>
          )}

          <Link
            className="orders-back-link"
            to="/inicio"
          >
            ← Volver al inicio
          </Link>
        </section>
      </main>
    </>
  );
}

export default OrdersPage;