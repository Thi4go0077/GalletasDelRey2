import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { products } from "../data/products";
import { authRepository } from "../repositories/authRepository";
import { cartService } from "../services/cartService";
import type { ProductId } from "../types/cart";

const heroCookieImage =
  "https://images.unsplash.com/photo-1436564989038-18b9958df72b?auto=format&fit=crop&w=1100&q=80";

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();
  const [quantities, setQuantities] = useState(() => cartService.getQuantities());

  useEffect(() => {
    cartService.setQuantities(quantities);
  }, [quantities]);

  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  const handleQuantityChange = (productId: ProductId, change: number) => {
    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [productId]: Math.max(0, currentQuantities[productId] + change),
    }));
  };

  const handleViewCart = () => {
    cartService.setQuantities(quantities);
    navigate("/carrito");
  };

  return (
    <>
      <Navbar user={user} />

      <main className="home-page">
        <section className="home-hero" aria-labelledby="home-hero-title">
          <div className="home-hero__content">
            <p className="home-hero__eyebrow">Recién horneadas con cariño</p>
            <h1 id="home-hero-title">Galletas Del Rey</h1>
            <p className="home-hero__description">
              Sabores artesanales para compartir momentos dulces, cercanos y
              especiales cada día.
            </p>
            <a className="home-hero__button" href="#sabores">
              VER CATÁLOGO
            </a>
          </div>

          <figure className="home-hero__image-card">
            <img
              src={heroCookieImage}
              alt="Galletas artesanales reales servidas junto a cítricos"
            />
          </figure>
        </section>

        <section className="welcome-card" aria-label="Mensaje de bienvenida">
          <p>Bienvenido a la plataforma de gestión de Galletas Del Rey</p>
          {user ? (
            <div className="welcome-card__session">
              <span>Sesión activa: {user.name}</span>
              <button type="button" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <span className="welcome-card__hint">No existe una sesión activa.</span>
          )}
        </section>

        <section className="flavors-section" id="sabores" aria-labelledby="flavors-title">
          <div className="section-heading">
            <p>Nuestro catálogo</p>
            <h2 id="flavors-title">Sabores Disponibles</h2>
          </div>

          <div className="flavors-grid">
            {products.map((product) => (
              <article className="flavor-card" key={product.id}>
                <img src={product.image} alt={product.alt} />
                <h3>{product.name}</h3>
                <div className="quantity-control" aria-label={`Cantidad de ${product.name}`}>
                  <button
                    aria-label={`Disminuir cantidad de ${product.name}`}
                    onClick={() => handleQuantityChange(product.id, -1)}
                    type="button"
                  >
                    -
                  </button>
                  <span aria-live="polite">{quantities[product.id]}</span>
                  <button
                    aria-label={`Aumentar cantidad de ${product.name}`}
                    onClick={() => handleQuantityChange(product.id, 1)}
                    type="button"
                  >
                    +
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="cart-action">
            <button className="cart-action__button" onClick={handleViewCart} type="button">
              VER CARRITO
            </button>
          </div>
        </section>

        <section className="contact-strip" id="contacto" aria-label="Contacto">
          <p>¿Quieres hacer un pedido especial? Muy pronto conectaremos esta sección.</p>
        </section>
      </main>
    </>
  );
}

export default HomePage;
