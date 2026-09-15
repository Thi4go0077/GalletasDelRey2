import { Navigate } from "react-router-dom";

import DistributorNavbar from "../components/layout/DistributorNavbar";
import { authRepository } from "../repositories/authRepository";

import { getOrders } from "../services/distributorService";

import "./DistributorOrdersPage.css";

function DistributorOrdersPage() {
  const user = authRepository.getCurrentUser();

  if (!user || user.role !== "DISTRIBUIDOR") {
    return <Navigate to="/distribuidor-login" replace />;
  }

  const orders = getOrders();

  return (
    <div className="distributor-orders">
      <DistributorNavbar user={user} />

      <main className="distributor-orders__content">
        <section className="distributor-orders__header">
          <p>MIS COMPRAS</p>

          <h1>Mis pedidos 🧾</h1>

          <span>
            Aquí puedes consultar todos tus pedidos como
            distribuidor.
          </span>
        </section>

        {orders.length === 0 ? (
          <section className="orders-empty">
            <div>📦</div>

            <h2>Aún no tienes pedidos</h2>

            <p>
              Realiza tu primera compra por lotes para verla
              aquí.
            </p>

            <a href="/distribuidor/lotes">
              Comprar mi primer lote
            </a>
          </section>
        ) : (
          <section className="orders-list">
            {orders.map((order) => (
              <article
                className="order-card"
                key={order.id}
              >
                <div className="order-card__top">
                  <div>
                    <span>Pedido</span>

                    <h2>
                      #{order.id.slice(-6)}
                    </h2>
                  </div>

                  <span className="order-status">
                    {order.status}
                  </span>
                </div>

                <div className="order-card__details">
                  <div>
                    <span>Fecha</span>

                    <strong>
                      {new Date(
                        order.date,
                      ).toLocaleDateString("es-BO")}
                    </strong>
                  </div>

                  <div>
                    <span>Lotes</span>

                    <strong>{order.lots}</strong>
                  </div>

                  <div>
                    <span>Bolsas</span>

                    <strong>{order.bags}</strong>
                  </div>

                  <div>
                    <span>Descuento</span>

                    <strong>
                      {order.discountRate * 100}%
                    </strong>
                  </div>

                  <div>
                    <span>Total</span>

                    <strong>
                      {order.total.toFixed(2)} Bs
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default DistributorOrdersPage;
