import { useState } from "react";

import type { FormEventHandler } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { authRepository } from "../repositories/authRepository";

import "./DistributorRegisterPage.css";

function DistributorRegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [carnet, setCarnet] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] =
    useState("");
  const [nit, setNit] = useState("");
  const [address, setAddress] =
    useState("");
  const [city, setCity] = useState("");
  const [businessType, setBusinessType] =
    useState("");
  const [experience, setExperience] =
    useState("");
  const [password, setPassword] =
    useState("");
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
      authRepository.registerDistributor({
        name,
        carnet,
        password,
        email,
        phone,
        businessName,
        nit,
        address,
        city,
        businessType,
        experience,
      });

    setIsLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/distribuidor", {
      replace: true,
    });
  };

  return (
    <main className="distributor-register-page">
      <section className="distributor-register-card">
        <header className="distributor-register-header">
          <div className="distributor-register-brand">
            <span>♛</span>

            <div>
              <strong>
                GALLETAS DEL REY
              </strong>

              <small>
                REGISTRO DE DISTRIBUIDORES
              </small>
            </div>
          </div>
        </header>

        <div className="distributor-register-content">
          <h1>
            Conviértete en distribuidor
          </h1>

          <p className="distributor-register-subtitle">
            Completa tus datos comerciales
            para crear tu cuenta de
            distribuidor.
          </p>

          <form
            className="distributor-register-form"
            onSubmit={handleSubmit}
          >
            <h2>
              👤 Datos personales
            </h2>

            <div className="distributor-form-grid">
              <div className="distributor-field">
                <label htmlFor="name">
                  Nombre completo
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value,
                    )
                  }
                  placeholder="Nombre completo"
                  required
                />
              </div>

              <div className="distributor-field">
                <label htmlFor="carnet">
                  Carnet de identidad
                </label>

                <input
                  id="carnet"
                  type="text"
                  value={carnet}
                  onChange={(event) =>
                    setCarnet(
                      event.target.value,
                    )
                  }
                  placeholder="Número de carnet"
                  required
                />
              </div>

              <div className="distributor-field">
                <label htmlFor="email">
                  Correo electrónico
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value,
                    )
                  }
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              <div className="distributor-field">
                <label htmlFor="phone">
                  Teléfono
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      event.target.value,
                    )
                  }
                  placeholder="Ej. 70000000"
                  required
                />
              </div>
            </div>

            <h2>
              🏢 Información comercial
            </h2>

            <div className="distributor-form-grid">
              <div className="distributor-field">
                <label htmlFor="businessName">
                  Nombre del negocio
                </label>

                <input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(event) =>
                    setBusinessName(
                      event.target.value,
                    )
                  }
                  placeholder="Ej. Distribuidora Thiago"
                  required
                />
              </div>

              <div className="distributor-field">
                <label htmlFor="nit">
                  NIT
                </label>

                <input
                  id="nit"
                  type="text"
                  value={nit}
                  onChange={(event) =>
                    setNit(
                      event.target.value,
                    )
                  }
                  placeholder="Número de NIT"
                  required
                />
              </div>

              <div className="distributor-field">
                <label htmlFor="businessType">
                  Tipo de negocio
                </label>

                <select
                  id="businessType"
                  value={businessType}
                  onChange={(event) =>
                    setBusinessType(
                      event.target.value,
                    )
                  }
                  required
                >
                  <option value="">
                    Selecciona una opción
                  </option>

                  <option value="Tienda">
                    Tienda
                  </option>

                  <option value="Minimarket">
                    Minimarket
                  </option>

                  <option value="Mayorista">
                    Mayorista
                  </option>

                  <option value="Distribuidora">
                    Distribuidora
                  </option>

                  <option value="Otro">
                    Otro
                  </option>
                </select>
              </div>

              <div className="distributor-field">
                <label htmlFor="experience">
                  Experiencia en distribución
                </label>

                <select
                  id="experience"
                  value={experience}
                  onChange={(event) =>
                    setExperience(
                      event.target.value,
                    )
                  }
                  required
                >
                  <option value="">
                    Selecciona una opción
                  </option>

                  <option value="Sin experiencia">
                    Sin experiencia
                  </option>

                  <option value="Menos de 1 año">
                    Menos de 1 año
                  </option>

                  <option value="1 a 3 años">
                    1 a 3 años
                  </option>

                  <option value="Más de 3 años">
                    Más de 3 años
                  </option>
                </select>
              </div>
            </div>

            <div className="distributor-field">
              <label htmlFor="address">
                Dirección del negocio
              </label>

              <input
                id="address"
                type="text"
                value={address}
                onChange={(event) =>
                  setAddress(
                    event.target.value,
                  )
                }
                placeholder="Dirección comercial"
                required
              />
            </div>

            <div className="distributor-field">
              <label htmlFor="city">
                Ciudad
              </label>

              <input
                id="city"
                type="text"
                value={city}
                onChange={(event) =>
                  setCity(
                    event.target.value,
                  )
                }
                placeholder="Ej. Sucre"
                required
              />
            </div>

            <h2>
              🔐 Datos de acceso
            </h2>

            <div className="distributor-form-grid">
              <div className="distributor-field">
                <label htmlFor="password">
                  Contraseña
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                  placeholder="Mínimo 6 caracteres"
                  minLength={6}
                  required
                />
              </div>

              <div className="distributor-field">
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
                  required
                />
              </div>
            </div>

            {error && (
              <p
                className="distributor-register-error"
                role="alert"
              >
                {error}
              </p>
            )}

            <label className="distributor-register-terms">
              <input
                type="checkbox"
                required
              />

              <span>
                Declaro que los datos
                proporcionados son correctos
                y acepto los términos y
                condiciones.
              </span>
            </label>

            <button
              type="submit"
              className="distributor-register-button"
              disabled={isLoading}
            >
              {isLoading
                ? "CREANDO CUENTA..."
                : "CREAR CUENTA DE DISTRIBUIDOR"}
            </button>
          </form>

          <div className="distributor-register-footer">
            <span>
              ¿Ya tienes una cuenta?
            </span>

            <Link to="/distribuidor-login">
              Iniciar sesión como
              distribuidor
            </Link>
          </div>

          <div className="distributor-register-footer">
            <Link to="/registro">
              ← Volver al registro de cliente
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DistributorRegisterPage;