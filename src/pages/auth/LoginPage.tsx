import { useState } from "react";

import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm";

import { authRepository } from "../../repositories/authRepository";

import type { LoginCredentials } from "../../types/auth";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  if (authRepository.isAuthenticated()) {
    const user = authRepository.getCurrentUser();

    if (user?.role === "DISTRIBUIDOR") {
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

    if (user.role === "DISTRIBUIDOR") {
      navigate("/distribuidor", { replace: true });
      return;
    }

    navigate("/inicio", { replace: true });
  };

  return (
    <main className="login-page">
      <LoginForm
        error={error}
        onSubmit={handleLogin}
      />

      <section className="login-page__distributor">
        <div className="login-page__distributor-icon">
          🚚
        </div>

        <div className="login-page__distributor-content">
          <p className="login-page__distributor-label">
            ACCESO EXCLUSIVO
          </p>

          <h2>¿Eres distribuidor?</h2>

          <p>
            Accede a tu área exclusiva para comprar por
            lotes y obtener beneficios por volumen.
          </p>
        </div>

        <Link
          className="login-page__distributor-button"
          to="/distribuidor-login"
        >
          🚚 Ingresar como distribuidor
        </Link>
      </section>
    </main>
  );
}

export default LoginPage;