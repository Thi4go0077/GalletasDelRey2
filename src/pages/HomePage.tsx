
import Navbar from "../components/layout/Navbar";

function HomePage() {
  return (
    <main className="home-page">
      <Navbar />
    </main>

import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import { authRepository } from "../repositories/authRepository";

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Navbar user={user} />
      <main className="home-page">
        <h1>Página principal</h1>

        {user ? (
          <>
            <p>Bienvenido, {user.name}</p>
            <p>Carnet: {user.carnet}</p>
            <p>Rol: {user.role}</p>

            <button type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <p>No existe una sesión activa.</p>
        )}
      </main>
    </>

  );
}

export default HomePage;
