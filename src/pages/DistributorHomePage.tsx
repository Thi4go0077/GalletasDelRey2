import { Navigate, useNavigate } from "react-router-dom";

import DistributorNavbar from "../components/layout/DistributorNavbar";
import { authRepository } from "../repositories/authRepository";

import "./DistributorHomePage.css";

function DistributorHomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  // Si no hay sesión, vuelve al login de distribuidores
  if (!user) {
    return (
      <Navigate
        to="/distribuidor-login"
        replace
      />
    );
  }

  // Si la cuenta no es distribuidor, no puede entrar
  if (user.role !== "DISTRIBUIDOR") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const handleProfile = () => {
    navigate("/distribuidor/perfil");
  };

  const handleLogout = () => {
    authRepository.logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="distributor-home">

      <DistributorNavbar user={user} />

      <main className="distributor-home__content">

        {/* =========================================
            HERO
        ========================================= */}

        <section className="distributor-home__hero">

          <div className="distributor-home__hero-content">

            <p className="distributor-home__eyebrow">
              🚚 ÁREA EXCLUSIVA DE DISTRIBUIDORES
            </p>

            <h1>
              ¡Bienvenido, {user.name}! 👋
            </h1>

            <p>
              Gestiona tus compras por lotes, consulta tus
              pedidos y aprovecha los beneficios exclusivos
              que Galletas Del Rey tiene para ti.
            </p>

            <div className="distributor-home__hero-actions">

              <button
                type="button"
                onClick={() =>
                  navigate("/distribuidor/lotes")
                }
                className="distributor-home__primary-button"
              >
                📦 COMPRAR POR LOTES
              </button>

              <button
                type="button"
                onClick={handleProfile}
                className="distributor-home__secondary-button"
              >
                👤 VER MI PERFIL
              </button>

            </div>

          </div>

          <div className="distributor-home__hero-badge">

            <span>
              🚚
            </span>

            <strong>
              DISTRIBUIDOR
            </strong>

            <small>
              Cuenta activa
            </small>

          </div>

        </section>


        {/* =========================================
            RESUMEN
        ========================================= */}

        <section className="distributor-home__summary">

          <article>
            <span>
              📦
            </span>

            <div>
              <strong>
                50
              </strong>

              <p>
                Bolsas por lote
              </p>
            </div>
          </article>


          <article>
            <span>
              💰
            </span>

            <div>
              <strong>
                100 Bs
              </strong>

              <p>
                Precio base por lote
              </p>
            </div>
          </article>


          <article>
            <span>
              ⭐
            </span>

            <div>
              <strong>
                Nivel 1
              </strong>

              <p>
                Tu nivel actual
              </p>
            </div>
          </article>


          <article>
            <span>
              🎁
            </span>

            <div>
              <strong>
                5%
              </strong>

              <p>
                Beneficio inicial
              </p>
            </div>
          </article>

        </section>


        {/* =========================================
            ACCIONES PRINCIPALES
        ========================================= */}

        <section className="distributor-home__section">

          <div className="distributor-home__section-heading">

            <p>
              GESTIONA TU CUENTA
            </p>

            <h2>
              ¿Qué deseas hacer?
            </h2>

            <span>
              Accede rápidamente a las principales funciones
              de tu cuenta de distribuidor.
            </span>

          </div>


          <div className="distributor-home__cards">

            <a
              className="distributor-card"
              href="/distribuidor/lotes"
            >

              <span className="distributor-card__icon">
                📦
              </span>

              <h2>
                Comprar por lotes
              </h2>

              <p>
                Realiza pedidos de 50 bolsas por lote y
                gestiona tus compras de manera sencilla.
              </p>

              <strong>
                Comprar ahora →
              </strong>

            </a>


            <a
              className="distributor-card"
              href="/distribuidor/pedidos"
            >

              <span className="distributor-card__icon">
                🧾
              </span>

              <h2>
                Mis pedidos
              </h2>

              <p>
                Consulta tus pedidos y revisa el estado
                de cada compra realizada.
              </p>

              <strong>
                Ver pedidos →
              </strong>

            </a>


            <a
              className="distributor-card"
              href="/distribuidor/beneficios"
            >

              <span className="distributor-card__icon">
                🎁
              </span>

              <h2>
                Mis beneficios
              </h2>

              <p>
                Consulta tu nivel, descuentos y progreso
                mensual como distribuidor.
              </p>

              <strong>
                Ver beneficios →
              </strong>

            </a>


            <button
              type="button"
              className="distributor-card distributor-card--profile"
              onClick={handleProfile}
            >

              <span className="distributor-card__icon">
                👤
              </span>

              <h2>
                Mi perfil
              </h2>

              <p>
                Consulta tus datos personales y la
                información registrada de tu cuenta.
              </p>

              <strong>
                Ver mi perfil →
              </strong>

            </button>

          </div>

        </section>


        {/* =========================================
            NIVELES
        ========================================= */}

        <section className="distributor-home__level-section">

          <div className="distributor-home__section-heading">

            <p>
              ⭐ PROGRAMA DE BENEFICIOS
            </p>

            <h2>
              Tu progreso como distribuidor
            </h2>

          </div>


          <div className="distributor-home__levels">

            <article className="distributor-level distributor-level--active">

              <span className="distributor-level__icon">
                🥉
              </span>

              <div>

                <small>
                  NIVEL 1
                </small>

                <h3>
                  Distribuidor inicial
                </h3>

                <p>
                  1 a 2 lotes mensuales
                </p>

                <strong>
                  Beneficio: 5%
                </strong>

              </div>

            </article>


            <article className="distributor-level">

              <span className="distributor-level__icon">
                🥈
              </span>

              <div>

                <small>
                  NIVEL 2
                </small>

                <h3>
                  Distribuidor frecuente
                </h3>

                <p>
                  3 a 5 lotes mensuales
                </p>

                <strong>
                  Beneficio: 10%
                </strong>

              </div>

            </article>


            <article className="distributor-level">

              <span className="distributor-level__icon">
                🥇
              </span>

              <div>

                <small>
                  NIVEL 3
                </small>

                <h3>
                  Distribuidor destacado
                </h3>

                <p>
                  6 o más lotes mensuales
                </p>

                <strong>
                  Beneficio: 15%
                </strong>

              </div>

            </article>

          </div>

        </section>


        {/* =========================================
            INFORMACIÓN
        ========================================= */}

        <section className="distributor-home__info">

          <div>

            <span className="distributor-home__info-icon">
              💡
            </span>

            <div>

              <h2>
                Aprovecha tus beneficios
              </h2>

              <p>
                Mientras más lotes compres durante el mes,
                mayor será tu nivel y mejores serán tus
                beneficios como distribuidor.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/distribuidor/beneficios")
            }
          >
            VER MIS BENEFICIOS
          </button>

        </section>


        {/* =========================================
            CONTACTO
        ========================================= */}

        <section className="distributor-home__contact">

          <div>

            <p>
              📞 ¿NECESITAS AYUDA?
            </p>

            <h2>
              Estamos para ayudarte
            </h2>

            <span>
              Comunícate con el equipo de Galletas Del Rey
              para consultas sobre pedidos y distribución.
            </span>

          </div>


          <div className="distributor-home__contact-numbers">

            <a href="tel:65251922">
              📱 Edgar — 65251922
            </a>

            <a href="tel:73433143">
              📱 Thiago — 73433143
            </a>

          </div>

        </section>


        {/* =========================================
            FOOTER
        ========================================= */}

        <footer className="distributor-home__footer">

          <div>
            <span>
              ♛
            </span>

            <strong>
              GALLETAS DEL REY
            </strong>
          </div>

          <p>
            Área exclusiva para distribuidores
          </p>

          <button
            type="button"
            onClick={handleLogout}
          >
            🚪 Cerrar sesión
          </button>

        </footer>

      </main>

    </div>
  );
}

export default DistributorHomePage;