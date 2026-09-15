import { useState } from "react";
import type { FormEvent } from "react";
import "./DistributorLogin.css";

interface DistributorLoginProps {
  error?: string;
  onSubmit: (credentials: {
    carnet: string;
    password: string;
  }) => void;
}

function DistributorLogin({
  error,
  onSubmit,
}: DistributorLoginProps) {
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
    <section className="distributor-login">
      <div className="distributor-login__card">
        <div className="distributor-login__icon">
          🚚
        </div>

        <p className="distributor-login__eyebrow">
          ÁREA EXCLUSIVA
        </p>

        <h1>Acceso de Distribuidores</h1>

        <p className="distributor-login__description">
          Ingresa a tu cuenta de distribuidor para acceder a
          precios especiales, compras por lotes y beneficios
          exclusivos.
        </p>

        <form
          className="distributor-login__form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="distributor-carnet">
            Usuario o carnet
          </label>

          <input
            id="distributor-carnet"
            type="text"
            value={carnet}
            onChange={(event) => setCarnet(event.target.value)}
            placeholder="Ej. distribuidor1"
            autoComplete="username"
          />

          <label htmlFor="distributor-password">
            Contraseña
          </label>

          <input
            id="distributor-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
          />

          {error && (
            <p className="distributor-login__error">
              {error}
            </p>
          )}

          <button type="submit">
            🚚 Ingresar como distribuidor
          </button>
        </form>

        <a
          className="distributor-login__back"
          href="/login"
        >
          ← Volver al acceso de clientes
        </a>
      </div>
    </section>
  );
}

export default DistributorLogin;
