import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm";
import { authRepository } from "../../repositories/authRepository";
import type { LoginCredentials } from "../../types/auth";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const currentUser = authRepository.getCurrentUser();

  // Si ya existe una sesión, redirigir según el rol.
  if (authRepository.isAuthenticated()) {
    if (currentUser?.role === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }

    if (currentUser?.role === "DISTRIBUIDOR") {
      return <Navigate to="/distribuidor" replace />;
    }

    return <Navigate to="/inicio" replace />;
  }

  const handleLogin = (credentials: LoginCredentials) => {
    setError("");

    const user = authRepository.login(credentials);

    if (!user) {
      setError("El carnet o la contraseña son incorrectos.");
      return;
    }

    if (user.role === "ADMIN") {
      navigate("/admin", { replace: true });
      return;
    }

    if (user.role === "DISTRIBUIDOR") {
      navigate("/distribuidor", { replace: true });
      return;
    }

    navigate("/inicio", { replace: true });
  };

  return (
    <main className="login-page">
      <div className="login-page__layout">
        <section className="login-page__main">
          <LoginForm error={error} onSubmit={handleLogin} />
        </section>

        <aside className="login-page__access">
          <section className="login-page__access-card login-page__access-card--distributor">
            <div className="login-page__access-icon" aria-hidden="true">
              🚚
            </div>

            <p className="login-page__access-label">
              ACCESO EXCLUSIVO
            </p>

            <h2>¿Eres distribuidor?</h2>

            <p className="login-page__access-description">
              Compra por lotes, consulta tus pedidos y disfruta de
              beneficios según tu volumen de compra.
            </p>

            <Link
              className="login-page__access-button login-page__access-button--distributor"
              to="/distribuidor-login"
            >
              Ingresar como distribuidor
              <span aria-hidden="true"> →</span>
            </Link>
          </section>

          <section className="login-page__access-card login-page__access-card--admin">
            <div className="login-page__access-icon" aria-hidden="true">
              👑
            </div>

            <p className="login-page__access-label">
              ACCESO RESTRINGIDO
            </p>

            <h2>Administración</h2>

            <p className="login-page__access-description">
              Accede al panel de dirección para supervisar pedidos
              y gestionar las operaciones de Galletas Del Rey.
            </p>

            <Link
              className="login-page__access-button login-page__access-button--admin"
              to="/admin-login"
            >
              Ingresar como administrador
              <span aria-hidden="true"> →</span>
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default LoginPage;