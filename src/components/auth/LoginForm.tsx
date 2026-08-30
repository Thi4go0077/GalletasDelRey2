import { useState } from "react";
import type { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import type { LoginCredentials } from "../../types/auth";
import "./LoginForm.css";

interface LoginFormProps {
  error?: string;
  onSubmit: (credentials: LoginCredentials) => void;
}

function LoginForm({ error, onSubmit }: LoginFormProps) {
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const normalizedCarnet = carnet.trim();

    if (!normalizedCarnet || !password) {
      return;
    }

    onSubmit({
      carnet: normalizedCarnet,
      password,
    });
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <header className="login-header">
          <div className="login-brand">
            <span className="login-crown" aria-hidden="true">
              ♛
            </span>

            <span className="login-brand-name">
              Galletas del Rey
            </span>
          </div>
        </header>

        <div className="login-content">
          <h1>Bienvenido de nuevo</h1>

          <p className="login-subtitle">
            Inicie sesión para continuar.
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="carnet">
                Correo electrónico / Carnet de identidad
              </label>

              <div className="login-input-wrapper">
                <span className="login-input-icon" aria-hidden="true">
                  ✉
                </span>

                <input
                  id="carnet"
                  name="carnet"
                  type="text"
                  value={carnet}
                  onChange={(event) => setCarnet(event.target.value)}
                  placeholder="Ingrese su correo o carnet"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password">
                Contraseña
              </label>

              <div className="login-input-wrapper">
                <span className="login-input-icon" aria-hidden="true">
                  🔒
                </span>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Ingrese su contraseña"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  aria-label={
                    showPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showPassword ? "◉" : "👁"}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />

                <span>Recordarme</span>
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() => {
                  alert(
                    "La recuperación de contraseña se implementará próximamente.",
                  );
                }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {error && (
              <p
                className="login-error"
                role="alert"
                aria-live="polite"
              >
                {error}
              </p>
            )}

            <button type="submit" className="login-button">
              INICIAR SESIÓN
            </button>
          </form>

          <div className="login-register">
            <span>¿No tienes una cuenta?</span>

            <Link to="/registro" className="register-link">
              Registrarse
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginForm;