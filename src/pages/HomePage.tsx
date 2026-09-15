import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import { products } from "../data/products";
import { authRepository } from "../repositories/authRepository";

import "./HomePage.css";

const heroCookieImage =
  "https://images.unsplash.com/photo-1436564989038-18b9958df72b?auto=format&fit=crop&w=1100&q=80";

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  const handleLogout = () => {
    authRepository.logout();

    navigate("/login", {
      replace: true,
    });
  };

  const handleViewCart = () => {
    navigate("/carrito");
  };

  const handleCatalog = () => {
    navigate("/catalogo");
  };

  const handleProfile = () => {
    navigate("/perfil");
  };

  return (
    <>
      <Navbar user={user} />

      <main className="home-page">

        {/* =========================================
            HERO PRINCIPAL
        ========================================= */}

        <section
          className="home-hero"
          aria-labelledby="home-hero-title"
        >
          <div className="home-hero__content">

            <p className="home-hero__eyebrow">
              🍪 Recién horneadas con cariño
            </p>

            <h1 id="home-hero-title">
              Galletas Del Rey
            </h1>

            <p className="home-hero__description">
              Descubre nuestros deliciosos sabores y
              disfruta de galletas ideales para compartir
              en cada momento.
            </p>

            <div className="home-hero__actions">

              <button
                type="button"
                className="home-hero__button"
                onClick={handleCatalog}
              >
                VER CATÁLOGO
              </button>

              <button
                type="button"
                className="home-hero__secondary-button"
                onClick={handleViewCart}
              >
                🛒 MI CARRITO
              </button>

            </div>

          </div>

          <figure className="home-hero__image-card">

            <img
              src={heroCookieImage}
              alt="Galletas artesanales"
            />

          </figure>
        </section>


        {/* =========================================
            BIENVENIDA
        ========================================= */}

        <section
          className="welcome-card"
          aria-label="Bienvenida"
        >

          <div>

            <p className="welcome-card__title">
              ¡Bienvenido a Galletas Del Rey! 👑
            </p>

            {user && (
              <>
                <p className="welcome-card__text">
                  Hola, <strong>{user.name}</strong>.
                  Nos alegra tenerte con nosotros.
                </p>

                <button
                  type="button"
                  className="welcome-card__profile-button"
                  onClick={handleProfile}
                >
                  👤 Ver nuestro perfil
                </button>
              </>
            )}

          </div>

          <button
            type="button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>

        </section>


        {/* =========================================
            SABORES
        ========================================= */}

        <section
          className="flavors-section"
          id="sabores"
          aria-labelledby="flavors-title"
        >

          <div className="section-heading">

            <p>
              🍪 DESCUBRE NUESTROS PRODUCTOS
            </p>

            <h2 id="flavors-title">
              Nuestros sabores más populares
            </h2>

            <span>
              Elige tu sabor favorito y disfruta
              de nuestras galletas.
            </span>

          </div>


          <div className="flavors-grid">

            {products.slice(0, 4).map((product) => (

              <article
                className="flavor-card"
                key={product.id}
              >

                <div className="flavor-card__image">

                  <img
                    src={product.image}
                    alt={product.alt}
                  />

                </div>

                <div className="flavor-card__content">

                  <span>
                    GALLETAS DEL REY
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <button
                    type="button"
                    onClick={handleCatalog}
                  >
                    VER PRODUCTO →
                  </button>

                </div>

              </article>

            ))}

          </div>


          <div className="cart-action">

            <button
              className="cart-action__button"
              onClick={handleCatalog}
              type="button"
            >
              VER TODOS LOS PRODUCTOS
            </button>

          </div>

        </section>


        {/* =========================================
            CÓMO COMPRAR
        ========================================= */}

        <section
          className="how-to-section"
          aria-labelledby="how-to-title"
        >

          <div className="section-heading">

            <p>
              🛒 COMPRA FÁCIL Y RÁPIDA
            </p>

            <h2 id="how-to-title">
              ¿Cómo comprar?
            </h2>

          </div>


          <div className="steps-grid">

            <article className="step-card">

              <span className="step-card__number">
                01
              </span>

              <div className="step-card__icon">
                🍪
              </div>

              <h3>
                Elige tus productos
              </h3>

              <p>
                Explora nuestro catálogo y
                encuentra tus sabores favoritos.
              </p>

            </article>


            <article className="step-card">

              <span className="step-card__number">
                02
              </span>

              <div className="step-card__icon">
                🛒
              </div>

              <h3>
                Agrega al carrito
              </h3>

              <p>
                Selecciona los productos y
                cantidades que deseas comprar.
              </p>

            </article>


            <article className="step-card">

              <span className="step-card__number">
                03
              </span>

              <div className="step-card__icon">
                📋
              </div>

              <h3>
                Revisa tu pedido
              </h3>

              <p>
                Comprueba los productos de tu
                carrito antes de confirmar.
              </p>

            </article>


            <article className="step-card">

              <span className="step-card__number">
                04
              </span>

              <div className="step-card__icon">
                💳
              </div>

              <h3>
                Realiza tu pago
              </h3>

              <p>
                Completa el proceso de compra
                de forma sencilla y segura.
              </p>

            </article>

          </div>

        </section>


        {/* =========================================
            BENEFICIOS
        ========================================= */}

        <section
          className="benefits-section"
          aria-labelledby="benefits-title"
        >

          <div className="section-heading">

            <p>
              ⭐ GALLETAS DEL REY
            </p>

            <h2 id="benefits-title">
              ¿Por qué elegirnos?
            </h2>

          </div>


          <div className="benefits-grid">

            <article className="benefit-card">

              <div>
                🍪
              </div>

              <h3>
                Productos de calidad
              </h3>

              <p>
                Elaboramos nuestras galletas
                pensando siempre en ofrecer
                un producto delicioso.
              </p>

            </article>


            <article className="benefit-card">

              <div>
                ❤️
              </div>

              <h3>
                Hechas con cariño
              </h3>

              <p>
                Cada producto busca llevar
                un momento dulce a nuestros
                clientes.
              </p>

            </article>


            <article className="benefit-card">

              <div>
                🛒
              </div>

              <h3>
                Compra sencilla
              </h3>

              <p>
                Nuestra plataforma facilita
                la selección y gestión de tus
                compras.
              </p>

            </article>

          </div>

        </section>


        {/* =========================================
            CONTACTO
        ========================================= */}

        <section
          className="contact-strip"
          id="contacto"
          aria-labelledby="contact-title"
        >

          <div className="contact-strip__header">

            <p>
              📞 ESTAMOS PARA AYUDARTE
            </p>

            <h2 id="contact-title">
              ¿Necesitas contactarnos?
            </h2>

            <span>
              Comunícate con nuestro equipo
              para realizar consultas o pedidos.
            </span>

          </div>


          <div className="contact-grid">

            <article className="contact-person">

              <div className="contact-person__icon">
                👤
              </div>

              <div>

                <span>
                  CEO
                </span>

                <h3>
                  Edgar Gomez Marquez David
                </h3>

                <a href="tel:65251922">
                  📱 65251922
                </a>

              </div>

            </article>


            <article className="contact-person">

              <div className="contact-person__icon">
                👤
              </div>

              <div>

                <span>
                  CEO
                </span>

                <h3>
                  Thiago Patzi Flores
                </h3>

                <a href="tel:73433143">
                  📱 73433143
                </a>

              </div>

            </article>

          </div>


          <div className="contact-actions">

            <a
              href="tel:65251922"
              className="contact-button"
            >
              📞 Llamar a Edgar
            </a>

            <a
              href="tel:73433143"
              className="contact-button"
            >
              📞 Llamar a Thiago
            </a>

          </div>

        </section>


        {/* =========================================
            FOOTER
        ========================================= */}

        <footer className="home-footer">

          <div className="home-footer__brand">

            <span>
              ♛
            </span>

            <strong>
              GALLETAS DEL REY
            </strong>

          </div>

          <p>
            © 2026 Galletas Del Rey.
            Todos los derechos reservados.
          </p>

          <p>
            Plataforma web de gestión y
            comercialización de productos.
          </p>

        </footer>

      </main>
    </>
  );
}

export default HomePage;