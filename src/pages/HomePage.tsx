import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { authRepository } from "../repositories/authRepository";

const flavorCards = [
  {
    name: "Coco",
    image: null,
    placeholder: "🥥",
    alt: "Placeholder decorativo para galletas sabor coco",
  },
  {
    name: "Avena",
    image: null,
    placeholder: "🌾",
    alt: "Placeholder decorativo para galletas sabor avena",
  },
  {
    name: "Limón",
    image: null,
    placeholder: "🍋",
    alt: "Placeholder decorativo para galletas sabor limón",
  },
  {
    name: "Frutilla",
    image: null,
    placeholder: "🍓",
    alt: "Placeholder decorativo para galletas sabor frutilla",
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

          <div
            className="home-hero__image-card home-hero__placeholder"
            role="img"
            aria-label="Placeholder decorativo para imagen principal de galletas"
          >
            <span>🍪</span>
          </div>
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
                {flavor.image ? (
                  <img src={flavor.image} alt={flavor.alt} />
                ) : (
                  <div className="flavor-card__placeholder" role="img" aria-label={flavor.alt}>
                    {flavor.placeholder}
                  </div>
                )}
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
