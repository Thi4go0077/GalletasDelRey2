
import "./Navbar.css";

const availableFlavors = ["Coco", "Avena", "Limón", "Frutilla"];

function Navbar() {
  return (
    <section className="navbar-shell" aria-label="Presentación de Galletas Del Rey">
      <header className="navbar" aria-label="Barra principal">
        <a className="navbar__brand" href="/" aria-label="Ir al inicio de Galletas Del Rey">
          <span className="navbar__crown" aria-hidden="true">♛</span>
          <span className="navbar__brand-name">Galletas Del Rey</span>
        </a>

        <nav className="navbar__nav" aria-label="Navegación principal">
          <button className="navbar__link" type="button">Inicio</button>
          <button className="navbar__link" type="button">Catalogo</button>
          <button className="navbar__link" type="button">Contacto</button>
        </nav>
      </header>

      <div className="navbar__hero">
        <div className="navbar__hero-copy">
          <p className="navbar__eyebrow">Recetas artesanales</p>
          <h1>Galletas del rey</h1>
        </div>

        <div className="navbar__cookie-plate" aria-label="Imagen decorativa de galletas en un plato">
          <span className="navbar__plate" aria-hidden="true" />
          <span className="navbar__cookie navbar__cookie--one" aria-hidden="true">🍪</span>
          <span className="navbar__cookie navbar__cookie--two" aria-hidden="true">🍪</span>
          <span className="navbar__cookie navbar__cookie--three" aria-hidden="true">🍪</span>
        </div>
      </div>

      <div className="navbar__flavors-card">
        <h2>Sabores disponibles</h2>
        <div className="navbar__flavors" aria-label="Lista de sabores disponibles">
          {availableFlavors.map((flavor) => (
            <span className="navbar__flavor" key={flavor}>{flavor}</span>
          ))}
        </div>
        <button className="navbar__catalog-button" type="button">Ver catalogo</button>
      </div>

      <p className="navbar__welcome">
        Bienvenido a la plataforma de gestion de Galletas Del Rey
      </p>
    </section>
    
import type { User } from "../../types/auth";

import "./Navbar.css";

interface NavbarProps {
  user: User | null;
}

function Navbar({ user }: NavbarProps) {
  const displayName = user?.name ?? "Invitado";

  return (
    <header className="navbar" aria-label="Barra principal">
      <div className="navbar__logo" aria-label="Logo de Galletas Del Rey">
        <span className="navbar__logo-mark">GDR</span>
        <span className="navbar__logo-text">Logo</span>
      </div>

      <div className="navbar__actions">
        <span className="navbar__username">{displayName}</span>
        <button className="navbar__button" type="button" aria-label="Abrir carrito">
          🛒
          <span>Carrito</span>
        </button>
        <button className="navbar__button" type="button" aria-label="Ver notificaciones">
          🔔
          <span>Notificaciones</span>
        </button>
        <button className="navbar__button" type="button" aria-label="Abrir perfil">
          👤
          <span>Perfil</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
