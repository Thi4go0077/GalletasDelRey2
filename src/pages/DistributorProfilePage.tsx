import { Navigate, useNavigate } from "react-router-dom";

import DistributorNavbar from "../components/layout/DistributorNavbar";
import { authRepository } from "../repositories/authRepository";

import "./DistributorProfilePage.css";


function DistributorProfilePage() {

  const navigate = useNavigate();

  const user =
    authRepository.getCurrentUserRecord();


  if (!user) {
    return (
      <Navigate
        to="/distribuidor-login"
        replace
      />
    );
  }


  if (user.role !== "DISTRIBUIDOR") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  const handleLogout = () => {

    authRepository.logout();

    navigate("/login", {
      replace: true,
    });

  };


  return (
    <div className="distributor-profile">

      <DistributorNavbar
        user={user}
      />


      <main className="distributor-profile__content">


        {/* =========================================
            ENCABEZADO
        ========================================= */}

        <section className="distributor-profile__header">

          <div className="distributor-profile__avatar">
            🚚
          </div>


          <div>

            <p>
              CUENTA DE DISTRIBUIDOR
            </p>

            <h1>
              Mi perfil
            </h1>

            <span>
              Administra y consulta la información
              registrada de tu cuenta.
            </span>

          </div>

        </section>


        {/* =========================================
            DATOS PERSONALES
        ========================================= */}

        <section className="distributor-profile__card">

          <div className="distributor-profile__card-title">

            <span>
              👤
            </span>

            <div>

              <h2>
                Datos personales
              </h2>

              <p>
                Información del titular de la cuenta
              </p>

            </div>

          </div>


          <div className="distributor-profile__grid">


            <div className="distributor-profile__field">

              <span>
                Nombre completo
              </span>

              <strong>
                {user.name}
              </strong>

            </div>


            <div className="distributor-profile__field">

              <span>
                Carnet de identidad
              </span>

              <strong>
                {user.carnet}
              </strong>

            </div>


            <div className="distributor-profile__field">

              <span>
                Correo electrónico
              </span>

              <strong>
                {user.email || "No registrado"}
              </strong>

            </div>


            <div className="distributor-profile__field">

              <span>
                Teléfono
              </span>

              <strong>
                {user.phone || "No registrado"}
              </strong>

            </div>

          </div>

        </section>


        {/* =========================================
            INFORMACIÓN COMERCIAL
        ========================================= */}

        <section className="distributor-profile__card">

          <div className="distributor-profile__card-title">

            <span>
              🏢
            </span>

            <div>

              <h2>
                Información comercial
              </h2>

              <p>
                Datos registrados de tu negocio
              </p>

            </div>

          </div>


          <div className="distributor-profile__grid">


            <div className="distributor-profile__field">

              <span>
                Nombre del negocio
              </span>

              <strong>
                {user.businessName ||
                  "No registrado"}
              </strong>

            </div>


            <div className="distributor-profile__field">

              <span>
                NIT
              </span>

              <strong>
                {user.nit ||
                  "No registrado"}
              </strong>

            </div>


            <div className="distributor-profile__field">

              <span>
                Tipo de negocio
              </span>

              <strong>
                {user.businessType ||
                  "No registrado"}
              </strong>

            </div>


            <div className="distributor-profile__field">

              <span>
                Experiencia
              </span>

              <strong>
                {user.experience ||
                  "No registrada"}
              </strong>

            </div>


            <div className="distributor-profile__field">

              <span>
                Dirección
              </span>

              <strong>
                {user.address ||
                  "No registrada"}
              </strong>

            </div>


            <div className="distributor-profile__field">

              <span>
                Ciudad
              </span>

              <strong>
                {user.city ||
                  "No registrada"}
              </strong>

            </div>

          </div>

        </section>


        {/* =========================================
            ESTADO DE LA CUENTA
        ========================================= */}

        <section className="distributor-profile__status">

          <div className="distributor-profile__status-icon">
            ✓
          </div>


          <div>

            <span>
              ESTADO DE LA CUENTA
            </span>

            <h2>
              Cuenta activa
            </h2>

            <p>
              Tu cuenta está habilitada para realizar
              compras como distribuidor.
            </p>

          </div>


          <div className="distributor-profile__role">

            🚚 DISTRIBUIDOR

          </div>

        </section>


        {/* =========================================
            BENEFICIOS
        ========================================= */}

        <section className="distributor-profile__benefits">

          <div className="distributor-profile__section-heading">

            <p>
              ⭐ PROGRAMA DE DISTRIBUIDORES
            </p>

            <h2>
              Tus beneficios
            </h2>

          </div>


          <div className="distributor-profile__benefit-grid">


            <article>

              <span>
                🥉
              </span>

              <h3>
                Nivel 1
              </h3>

              <p>
                1 a 2 lotes mensuales
              </p>

              <strong>
                Beneficio inicial: 5%
              </strong>

            </article>


            <article>

              <span>
                🥈
              </span>

              <h3>
                Nivel 2
              </h3>

              <p>
                3 a 5 lotes mensuales
              </p>

              <strong>
                Beneficio: 10%
              </strong>

            </article>


            <article>

              <span>
                🥇
              </span>

              <h3>
                Nivel 3
              </h3>

              <p>
                6 o más lotes mensuales
              </p>

              <strong>
                Beneficio: 15%
              </strong>

            </article>

          </div>

        </section>


        {/* =========================================
            ACCIONES
        ========================================= */}

        <div className="distributor-profile__actions">

          <button
            type="button"
            className="distributor-profile__back"
            onClick={() =>
              navigate("/distribuidor")
            }
          >
            ← Volver al inicio
          </button>


          <button
            type="button"
            className="distributor-profile__logout"
            onClick={handleLogout}
          >
            🚪 Cerrar sesión
          </button>

        </div>


      </main>

    </div>
  );
}


export default DistributorProfilePage;