import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DistributorLoginPage from "../pages/DistributorLoginPage";
import DistributorHomePage from "../pages/DistributorHomePage";
import DistributorLotsPage from "../pages/DistributorLotsPage";
import DistributorOrdersPage from "../pages/DistributorOrdersPage";
import DistributorBenefitsPage from "../pages/DistributorBenefitsPage";

import CatalogPage from "../pages/CatalogPage";
import CartPage from "../pages/CartPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Página inicial */}
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* Autenticación */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/registro"
          element={<RegisterPage />}
        />

        {/* Cliente / Usuario */}
        <Route
          path="/inicio"
          element={<HomePage />}
        />

        <Route
          path="/catalogo"
          element={<CatalogPage />}
        />

        <Route
          path="/carrito"
          element={<CartPage />}
        />

        {/* Acceso de distribuidores */}
        <Route
          path="/distribuidor-login"
          element={<DistributorLoginPage />}
        />

        {/* Área de distribuidores */}
        <Route
          path="/distribuidor"
          element={<DistributorHomePage />}
        />

        <Route
          path="/distribuidor/lotes"
          element={<DistributorLotsPage />}
        />

        <Route
          path="/distribuidor/pedidos"
          element={<DistributorOrdersPage />}
        />

        <Route
          path="/distribuidor/beneficios"
          element={<DistributorBenefitsPage />}
        />

        {/* Cualquier ruta inexistente vuelve al login */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;