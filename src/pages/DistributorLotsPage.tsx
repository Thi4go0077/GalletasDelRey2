import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import DistributorNavbar from "../components/layout/DistributorNavbar";
import { authRepository } from "../repositories/authRepository";

import {
  distributorPricing,
  getCurrentMonthLots,
  getDiscountRate,
  saveOrder,
} from "../services/distributorService";

import "./DistributorLotsPage.css";

function DistributorLotsPage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  const [lots, setLots] = useState(1);
  const [message, setMessage] = useState("");

  if (!user || user.role !== "DISTRIBUIDOR") {
    return <Navigate to="/distribuidor-login" replace />;
  }

  const currentMonthLots = getCurrentMonthLots();

  const annualContract =
    localStorage.getItem("distributor_annual_contract") ===
    "true";

  const newMonthlyTotal = currentMonthLots + lots;

  const discountRate = getDiscountRate(
    newMonthlyTotal,
    annualContract,
  );

  const calculation = useMemo(() => {
    const bags =
      lots * distributorPricing.BAGS_PER_LOT;

    const baseTotal =
      bags * distributorPricing.BAG_PRICE;

    const discountAmount =
      baseTotal * discountRate;

    const total =
      baseTotal - discountAmount;

    return {
      bags,
      baseTotal,
      discountAmount,
      total,
    };
  }, [lots, discountRate]);

  const handleConfirmOrder = () => {
    const order = {
      id: `order-${Date.now()}`,
      date: new Date().toISOString(),
      lots,
      bags: calculation.bags,
      baseTotal: calculation.baseTotal,
      discountRate,
      discountAmount: calculation.discountAmount,
      total: calculation.total,
      status: "CONFIRMADO" as const,
    };

    saveOrder(order);

    setMessage(
      `¡Pedido confirmado! Compraste ${lots} lote${
        lots === 1 ? "" : "s"
      }.`,
    );

    setTimeout(() => {
      navigate("/distribuidor/pedidos");
    }, 1000);
  };

  return (
    <div className="distributor-lots">
      <DistributorNavbar user={user} />

      <main className="distributor-lots__content">
        <section className="distributor-lots__header">
          <p>ÁREA DE COMPRAS</p>

          <h1>Comprar por lotes 📦</h1>

          <span>
            Cada lote contiene 50 bolsas de galletas.
          </span>
        </section>

        <section className="distributor-lots__layout">
          <div className="distributor-lots__selector">
            <h2>Selecciona tus lotes</h2>

            <p>
              Cada bolsa cuesta{" "}
              <strong>2 Bs</strong>.
            </p>

            <div className="lot-counter">
              <button
                type="button"
                onClick={() =>
                  setLots((value) =>
                    Math.max(1, value - 1),
                  )
                }
              >
                −
              </button>

              <strong>{lots}</strong>

              <button
                type="button"
                onClick={() =>
                  setLots((value) => value + 1)
                }
              >
                +
              </button>
            </div>

            <div className="lot-info">
              <span>Lotes</span>
              <strong>{lots}</strong>
            </div>

            <div className="lot-info">
              <span>Total de bolsas</span>
              <strong>{calculation.bags}</strong>
            </div>
          </div>

          <div className="distributor-lots__summary">
            <h2>Resumen de compra</h2>

            <div>
              <span>Precio base</span>
              <strong>
                {calculation.baseTotal.toFixed(2)} Bs
              </strong>
            </div>

            <div>
              <span>
                Descuento ({discountRate * 100}%)
              </span>

              <strong>
                -{calculation.discountAmount.toFixed(2)} Bs
              </strong>
            </div>

            <hr />

            <div className="total">
              <span>Total</span>

              <strong>
                {calculation.total.toFixed(2)} Bs
              </strong>
            </div>

            <button
              className="confirm-button"
              type="button"
              onClick={handleConfirmOrder}
            >
              📦 Confirmar pedido
            </button>

            {message && (
              <p className="success-message">
                {message}
              </p>
            )}
          </div>
        </section>

        <section className="distributor-lots__rules">
          <h2>Tu descuento depende de tus lotes mensuales</h2>

          <div className="rules-grid">
            <div>
              <strong>🥉 Nivel 1</strong>
              <span>1–2 lotes</span>
              <b>5%</b>
            </div>

            <div>
              <strong>🥈 Nivel 2</strong>
              <span>3–5 lotes</span>
              <b>10%</b>
            </div>

            <div>
              <strong>🥇 Nivel 3</strong>
              <span>6+ lotes</span>
              <b>15%</b>
            </div>

            <div>
              <strong>👑 Contrato anual</strong>
              <span>6+ lotes</span>
              <b>20%</b>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DistributorLotsPage;
