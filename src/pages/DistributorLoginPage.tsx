import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DistributorLogin from "../components/auth/DistributorLogin";

import { authRepository } from "../repositories/authRepository";

function DistributorLoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (credentials: {
    carnet: string;
    password: string;
  }) => {
    setError("");

    const user = authRepository.login(credentials);

    if (!user) {
      setError(
        "El usuario o la contraseña son incorrectos.",
      );
      return;
    }

    if (user.role !== "DISTRIBUIDOR") {
      authRepository.logout();

      setError(
        "Esta cuenta no tiene acceso al área de distribuidores.",
      );

      return;
    }

    navigate("/distribuidor", { replace: true });
  };

  return <DistributorLogin error={error} onSubmit={handleLogin} />;
}

export default DistributorLoginPage;
