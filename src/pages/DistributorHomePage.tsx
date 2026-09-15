import { Navigate } from "react-router-dom";

import DistributorNavbar from "../components/layout/DistributorNavbar";
import { authRepository } from "../repositories/authRepository";
import "./DistributorHomePage.css";

function DistributorHomePage() {
  const user = authRepository.getCurrentUser();

  // Si no hay sesión, vuelve al login de distribuidores
  if (!user) {
    return <Navigate to="/distribuidor-login" replace />;
  }

  // Si la cuenta no es distribuidor, no puede entrar
  if (user.role !== "DISTRIBUIDOR") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="distributor-home">
      <DistributorNavbar user={user} />

      <main className="distributor-home__content">
        <section className="distributor-home__hero">
          <p className="distributor-home__eyebrow">
            ÁREA EXCLUSIVA DE DISTRIBUIDORES
          </p>

          <h1>
            ¡Bienvenido, {user.name}! 🚚
          </h1>

          <p>
            Gestiona tus compras por lotes, consulta tus precios
            especiales y revisa todos los beneficios disponibles
            para distribuidores de Galletas Del Rey.
          </p>
        </section>

        <section className="distributor-home__cards">
          <a
            className="distributor-card"
            href="/distribuidor/lotes"
          >
            <span className="distributor-card__icon">
              📦
            </span>

            <h2>Comprar por lotes</h2>

            <p>
              Realiza pedidos de 50 bolsas por lote y accede a
              precios especiales según tu nivel.
            </p>
          </a>

          <a
            className="distributor-card"
            href="/distribuidor/pedidos"
          >
            <span className="distributor-card__icon">
              🧾
            </span>

            <h2>Mis pedidos</h2>

            <p>
              Consulta tus pedidos y revisa el estado de cada
              compra realizada.
            </p>
          </a>

          <a
            className="distributor-card"
            href="/distribuidor/precios"
          >
            <span className="distributor-card__icon">
              💰
            </span>

            <h2>Precios especiales</h2>

            <p>
              Consulta los precios y descuentos disponibles
              según tu nivel de distribuidor.
            </p>
          </a>

          <a
            className="distributor-card"
            href="/distribuidor/beneficios"
          >
            <span className="distributor-card__icon">
              🎁
            </span>

            <h2>Mis beneficios</h2>

            <p>
              Revisa tus beneficios, nivel actual y progreso
              mensual.
            </p>
          </a>
        </section>

        <section className="distributor-home__level">
          <div>
            <span className="distributor-home__level-icon">
              🥉
            </span>

            <div>
              <p>Nivel actual</p>
              <h2>Nivel 1</h2>
            </div>
          </div>

          <div className="distributor-home__level-info">
            <strong>Beneficio inicial: 5%</strong>

            <span>
              1 a 2 lotes mensuales
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DistributorHomePage;

