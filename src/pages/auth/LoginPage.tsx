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

  const currentUser = authRepository.getCurrentUser();

  /*
   * Si ya existe una sesión iniciada,
   * enviamos al usuario directamente a su área.
   */
  if (authRepository.isAuthenticated()) {
    if (currentUser?.role === "ADMIN") {
      return (
        <Navigate
          to="/admin/pedidos"
          replace
        />
      );
    }

    if (currentUser?.role === "DISTRIBUIDOR") {
      return (
        <Navigate
          to="/distribuidor"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/inicio"
        replace
      />
    );
  }

  const handleLogin = (
    credentials: LoginCredentials,
  ) => {
    setError("");

    const user = authRepository.login(
      credentials,
    );

    if (!user) {
      setError(
        "El carnet o la contraseña son incorrectos.",
      );
      return;
    }

    /*
     * ADMINISTRADOR
     */
    if (user.role === "ADMIN") {
      navigate("/admin/pedidos", {
        replace: true,
      });
      return;
    }

    /*
     * DISTRIBUIDOR
     */
    if (user.role === "DISTRIBUIDOR") {
      navigate("/distribuidor", {
        replace: true,
      });
      return;
    }

    /*
     * USUARIO NORMAL
     */
    navigate("/inicio", {
      replace: true,
    });
  };

  return (
    <main className="login-page">
      <LoginForm
        error={error}
        onSubmit={handleLogin}
      />

      {/* ACCESO PARA DISTRIBUIDORES */}
      <section className="login-page__distributor">
        <div className="login-page__distributor-icon">
          🚚
        </div>

        <div className="login-page__distributor-content">
          <p className="login-page__distributor-label">
            ACCESO EXCLUSIVO
          </p>

          <h2>
            ¿Eres distribuidor?
          </h2>

          <p>
            Accede a tu área exclusiva para
            comprar por lotes y obtener
            beneficios por volumen.
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