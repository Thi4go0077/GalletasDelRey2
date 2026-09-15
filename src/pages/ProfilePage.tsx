import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import { authRepository } from "../repositories/authRepository";

import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  const handleLogout = () => {
    authRepository.logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      <Navbar user={user} />

      <main className="profile-page">
        <section className="profile-container">

          {/* ENCABEZADO */}
          <header className="profile-header">
            <div className="profile-avatar">
              👤
            </div>

            <div>
              <p className="profile-header__label">
                MI CUENTA
              </p>

              <h1>
                Mi perfil
              </h1>

              <p>
                Consulta la información de tu cuenta
                en Galletas Del Rey.
              </p>
            </div>
          </header>


          {/* INFORMACIÓN DEL USUARIO */}
          <section className="profile-card">

            <div className="profile-card__title">
              <span>👤</span>

              <div>
                <h2>
                  Información personal
                </h2>

                <p>
                  Datos de tu cuenta
                </p>
              </div>
            </div>


            <div className="profile-info-grid">

              <div className="profile-info">
                <span>
                  Nombre completo
                </span>

                <strong>
                  {user.name}
                </strong>
              </div>


              <div className="profile-info">
                <span>
                  Carnet de identidad
                </span>

                <strong>
                  {user.carnet}
                </strong>
              </div>


              <div className="profile-info">
                <span>
                  Tipo de cuenta
                </span>

                <strong>
                  {user.role === "ADMIN"
                    ? "Administrador"
                    : "Cliente / Usuario"}
                </strong>
              </div>


              <div className="profile-info">
                <span>
                  Estado de cuenta
                </span>

                <strong className="profile-status">
                  ● Cuenta activa
                </strong>
              </div>

            </div>

          </section>


          {/* BENEFICIOS */}
          <section className="profile-benefits">

            <h2>
              ¿Qué puedes hacer?
            </h2>

            <div className="profile-benefits-grid">

              <article>
                <span>🍪</span>

                <h3>
                  Explorar productos
                </h3>

                <p>
                  Conoce nuestro catálogo de
                  galletas y sabores disponibles.
                </p>
              </article>


              <article>
                <span>🛒</span>

                <h3>
                  Realizar compras
                </h3>

                <p>
                  Agrega productos al carrito y
                  gestiona tus compras fácilmente.
                </p>
              </article>


              <article>
                <span>📋</span>

                <h3>
                  Gestionar pedidos
                </h3>

                <p>
                  Revisa y controla la información
                  relacionada con tus pedidos.
                </p>
              </article>

            </div>

          </section>


          {/* BOTONES */}
          <div className="profile-actions">

            <button
              type="button"
              className="profile-back-button"
              onClick={() => navigate("/inicio")}
            >
              ← Volver al inicio
            </button>


            <button
              type="button"
              className="profile-logout-button"
              onClick={handleLogout}
            >
              🚪 Cerrar sesión
            </button>

          </div>

        </section>
      </main>
    </>
  );
}

export default ProfilePage;