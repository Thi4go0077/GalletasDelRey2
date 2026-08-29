import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { authRepository } from "../repositories/authRepository";

const heroCookieImage =
  "https://images.unsplash.com/photo-1436564989038-18b9958df72b?auto=format&fit=crop&w=1100&q=80";

const flavorCards = [
  {
    name: "Coco",
    image:
      "https://images.unsplash.com/photo-1436564989038-18b9958df72b?auto=format&fit=crop&w=700&q=80",
    alt: "Galletas artesanales doradas con detalles de coco",
  },
  {
    name: "Avena",
    image:
      "https://images.unsplash.com/photo-1631311253861-52eaf0337adb?auto=format&fit=crop&w=700&q=80",
    alt: "Galletas de avena apiladas en una mesa",
  },
  {
    name: "Limón",
    image:
      "https://images.unsplash.com/photo-1744160252920-967ab9b733ce?auto=format&fit=crop&w=700&q=80",
    alt: "Galletas de limón con una presentación clara y fresca",
  },
  {
    name: "Frutilla",
    image:
      "https://images.unsplash.com/photo-1748185689409-e2cbe764d644?auto=format&fit=crop&w=700&q=80",
    alt: "Galletas acompañadas con frutillas frescas",
  },
];

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
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
            {flavorCards.map((flavor) => (
              <article className="flavor-card" key={flavor.name}>
                <img src={flavor.image} alt={flavor.alt} />
                <h3>{flavor.name}</h3>
              </article>
            ))}
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
