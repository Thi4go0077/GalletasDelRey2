import { useState } from "react";
import { Navigate } from "react-router-dom";

import DistributorNavbar from "../components/layout/DistributorNavbar";
import { authRepository } from "../repositories/authRepository";

import {
  getCurrentMonthLots,
  getDistributorLevel,
  hasAnnualContract,
  setAnnualContract,
} from "../services/distributorService";

import "./DistributorBenefitsPage.css";

function DistributorBenefitsPage() {
  const user = authRepository.getCurrentUser();

  const [annualContract, setContractState] =
    useState(hasAnnualContract());

  if (!user || user.role !== "DISTRIBUIDOR") {
    return <Navigate to="/distribuidor-login" replace />;
  }

  const monthlyLots = getCurrentMonthLots();

  const level = getDistributorLevel(monthlyLots);

  const progress =
    monthlyLots >= 6
      ? 100
      : monthlyLots >= 3
        ? (monthlyLots / 6) * 100
        : (monthlyLots / 3) * 100;

  const handleContractChange = () => {
    const newValue = !annualContract;

    setAnnualContract(newValue);
    setContractState(newValue);
  };

  return (
    <div className="distributor-benefits">
      <DistributorNavbar user={user} />

      <main className="distributor-benefits__content">
        <section className="benefits-header">
          <p>MIS BENEFICIOS</p>

          <h1>
            Tu progreso como distribuidor 🎁
          </h1>

          <span>
            Aumenta tus lotes mensuales para obtener mejores
            descuentos.
          </span>
        </section>

        <section className="current-level">
          <div className="current-level__icon">
            {monthlyLots >= 6
              ? "🥇"
              : monthlyLots >= 3
                ? "🥈"
                : "🥉"}
          </div>

          <div>
            <span>NIVEL ACTUAL</span>

            <h2>{level.level}</h2>

            <p>{level.description}</p>
          </div>

          <strong>
            {annualContract && monthlyLots >= 6
              ? "20%"
              : `${level.discount * 100}%`}
          </strong>
        </section>

        <section className="progress-section">
          <div className="progress-title">
            <span>
              Lotes comprados este mes
            </span>

            <strong>
              {monthlyLots} lotes
            </strong>
          </div>

          <div className="progress-bar">
            <div
              style={{
                width: `${Math.min(progress, 100)}%`,
              }}
            />
          </div>

          <p>
            {monthlyLots < 3 &&
              `Te faltan ${3 - monthlyLots} lote${
                3 - monthlyLots === 1 ? "" : "s"
              } para llegar al Nivel 2.`}

            {monthlyLots >= 3 &&
              monthlyLots < 6 &&
              `Te faltan ${6 - monthlyLots} lote${
                6 - monthlyLots === 1 ? "" : "s"
              } para llegar al Nivel 3.`}

            {monthlyLots >= 6 &&
              "¡Ya alcanzaste el Nivel 3! 🎉"}
          </p>
        </section>

        <section className="benefit-levels">
          <article
            className={monthlyLots < 3 ? "active" : ""}
          >
            <span>🥉</span>

            <h2>Nivel 1</h2>

            <p>1–2 lotes mensuales</p>

            <strong>5% de descuento</strong>
          </article>

          <article
            className={
              monthlyLots >= 3 && monthlyLots < 6
                ? "active"
                : ""
            }
          >
            <span>🥈</span>

            <h2>Nivel 2</h2>

            <p>3–5 lotes mensuales</p>

            <strong>10% de descuento</strong>
          </article>

          <article
            className={monthlyLots >= 6 ? "active" : ""}
          >
            <span>🥇</span>

            <h2>Nivel 3</h2>

            <p>6 lotes o más</p>

            <strong>15% de descuento</strong>
          </article>
        </section>

        <section className="annual-contract">
          <div>
            <span>👑</span>

            <div>
              <h2>Contrato anual</h2>

              <p>
                Si mantienes un compromiso anual y compras
                6 o más lotes mensuales, puedes acceder al
                <strong> 20% de descuento</strong>.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleContractChange}
          >
            {annualContract
              ? "✓ Contrato activado"
              : "Activar compromiso anual"}
          </button>
        </section>
      </main>
    </div>
  );
}

export default DistributorBenefitsPage;
