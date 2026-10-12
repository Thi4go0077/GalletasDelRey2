
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import "./AdminLoginPage.css";

function AdminLoginPage() {
  const navigate = useNavigate();

  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!carnet.trim() || !password) {
      setError("Ingresa tu carné y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const user = authRepository.login({carnet: carnet.trim(), password: password,
    });


      if (!user) {
        setError("El carné o la contraseña son incorrectos.");
        return;
      }

      if (user.role !== "ADMIN") {
        authRepository.logout();
        setError(
          "Acceso denegado. Esta pantalla es exclusiva del administrador.",
        );
        return;
      }

      navigate("/admin", { replace: true });
    } catch {
      setError("No se pudo iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <Link to="/login" className="admin-login-back">
          ← Volver
        </Link>

        <div className="admin-login-logo">
          <img src="/logo/logo.jpeg" alt="Logo de Galletas Del Rey" />
        </div>

        <p className="admin-login-eyebrow">ACCESO RESTRINGIDO</p>
        <h1>Panel administrativo</h1>
        <p className="admin-login-description">
          Inicia sesión para gestionar pedidos y supervisar las operaciones
          de Galletas Del Rey.
        </p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <label htmlFor="admin-carnet">Carné de identidad</label>
          <input
            id="admin-carnet"
            type="text"
            autoComplete="username"
            placeholder="Ingresa tu carné"
            value={carnet}
            onChange={(event) => setCarnet(event.target.value)}
            required
          />

          <label htmlFor="admin-password">Contraseña</label>
          <div className="admin-login-password">
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {error && (
            <p className="admin-login-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="admin-login-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verificando..." : "Ingresar al panel"}
          </button>
        </form>

        <div className="admin-login-security">
          <span>🔒</span>
          <p>Área exclusiva para personal autorizado.</p>
        </div>
      </section>
    </main>
  );
}

export default AdminLoginPage;
