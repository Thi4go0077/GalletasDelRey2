import { Link } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
  return (
    <main className="register-page">
      <section className="register-card">
        <header className="register-header">
          <div className="register-brand">
            <span className="register-crown" aria-hidden="true">
              ♛
            </span>

            <span className="register-brand-name">
              Galletas del Rey
            </span>
          </div>
        </header>

        <div className="register-content">
          <h1>Crea tu cuenta</h1>

          <p className="register-subtitle">
            Completa el formulario para registrarte.
          </p>

          <form className="register-form">
            <div className="register-field">
              <label htmlFor="fullName">Nombre completo</label>
              <input
                id="fullName"
                type="text"
                placeholder="Ejemplo: Juan Pérez"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="confirmPassword">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Repita su contraseña"
                minLength={6}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="userType">Tipo de usuario</label>

              <select id="userType" defaultValue="" required>
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="cliente">Cliente</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>

            <label className="register-terms">
              <input type="checkbox" required />
              <span>
                Acepto los términos y condiciones.
              </span>
            </label>

            <button type="submit" className="register-button">
              REGISTRARME
            </button>
          </form>

          <div className="register-login">
            <span>¿Ya tienes una cuenta?</span>
            <Link to="/login">Iniciar sesión</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;