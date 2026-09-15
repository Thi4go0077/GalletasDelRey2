import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";

import { authRepository } from "../../repositories/authRepository";

import type { UserRole } from "../../types/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const user = authRepository.getCurrentUser();

  // No hay sesión iniciada
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // El usuario no tiene permiso para esta sección
  if (!allowedRoles.includes(user.role)) {
    if (user.role === "DISTRIBUIDOR") {
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

  return <>{children}</>;
}

export default ProtectedRoute;