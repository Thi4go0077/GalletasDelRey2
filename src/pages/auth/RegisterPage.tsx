import { useState } from "react";

import type { FormEventHandler } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { authRepository } from "../../repositories/authRepository";

import "./RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] =
    useState(false);

  const handleSubmit: FormEventHandler<
    HTMLFormElement
  > = (event) => {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError(
        "Las contraseñas no coinciden.",
      );
      return;
    }

    setIsLoading(true);

    const result =
      authRepository.register({
        name,
        carnet,
        password,
      });

    setIsLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/inicio", {
      replace: true,
    });
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <header className="register-header">
          <div className="register-brand">
            <span
              className="register-crown"
              aria-hidden="true"
            >
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
            Regístrate como cliente para
            realizar tus compras.
          </p>

          <form
            className="register-form"
            onSubmit={handleSubmit}
          >
            <div className="register-field">
              <label htmlFor="fullName">
                Nombre completo
              </label>

              <input
                id="fullName"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Ejemplo: Thiago Pérez"
                autoComplete="name"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="carnet">
                Carnet de identidad
              </label>

              <input
                id="carnet"
                type="text"
                value={carnet}
                onChange={(event) =>
                  setCarnet(event.target.value)
                }
                placeholder="Ejemplo: 12345678"
                autoComplete="username"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="password">
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                autoComplete="new-password"
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
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value,
                  )
                }
                placeholder="Repita su contraseña"
                minLength={6}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="register-user-info">
              <span>👤</span>

              <div>
                <strong>
                  Tipo de cuenta
                </strong>

                <p>
                  Cliente / Usuario
                </p>
              </div>
            </div>

            {error && (
              <p
                className="register-error"
                role="alert"
              >
                {error}
              </p>
            )}

            <label className="register-terms">
              <input
                type="checkbox"
                required
              />

              <span>
                Acepto los términos y
                condiciones.
              </span>
            </label>

            <button
              type="submit"
              className="register-button"
              disabled={isLoading}
            >
              {isLoading
                ? "CREANDO CUENTA..."
                : "REGISTRARME"}
            </button>
          </form>

          <div className="register-distributor">
            <p>
              ¿Quieres vender y distribuir
              nuestros productos?
            </p>

            <Link
              to="/registro-distribuidor"
              className="distributor-register-link"
            >
              🚚 Registrarme como distribuidor
            </Link>
          </div>

          <div className="register-login">
            <span>
              ¿Ya tienes una cuenta?
            </span>

            <Link to="/login">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;