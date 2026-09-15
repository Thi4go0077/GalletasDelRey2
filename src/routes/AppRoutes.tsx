import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// =========================
// PÁGINAS DEL CLIENTE
// =========================
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import CatalogPage from "../pages/CatalogPage";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrdersPage";

// =========================
// AUTENTICACIÓN
// =========================
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// =========================
// PÁGINAS DEL DISTRIBUIDOR
// =========================
import DistributorLoginPage from "../pages/DistributorLoginPage";
import DistributorRegisterPage from "../pages/DistributorRegisterPage";
import DistributorHomePage from "../pages/DistributorHomePage";
import DistributorProfilePage from "../pages/DistributorProfilePage";
import DistributorLotsPage from "../pages/DistributorLotsPage";
import DistributorOrdersPage from "../pages/DistributorOrdersPage";
import DistributorBenefitsPage from "../pages/DistributorBenefitsPage";

// =========================
// ADMINISTRACIÓN
// =========================
import AdminOrdersPage from "../pages/AdminOrdersPage";

// =========================
// PROTECCIÓN DE RUTAS
// =========================
import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================
            RUTAS DE ACCESO
        ================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/registro"
          element={<RegisterPage />}
        />

        <Route
          path="/distribuidor-login"
          element={<DistributorLoginPage />}
        />

        <Route
          path="/registro-distribuidor"
          element={<DistributorRegisterPage />}
        />


        {/* ==================================
            RUTAS DEL CLIENTE
        ================================== */}

        <Route
          path="/inicio"
          element={
            <ProtectedRoute
              allowedRoles={[
                "USUARIO",
                "ADMIN",
              ]}
            >
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute
              allowedRoles={[
                "USUARIO",
                "ADMIN",
              ]}
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/catalogo"
          element={
            <ProtectedRoute
              allowedRoles={[
                "USUARIO",
                "ADMIN",
              ]}
            >
              <CatalogPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/carrito"
          element={
            <ProtectedRoute
              allowedRoles={[
                "USUARIO",
                "ADMIN",
              ]}
            >
              <CartPage />
            </ProtectedRoute>
          }
        />

        {/* MIS PEDIDOS DEL CLIENTE */}

        <Route
          path="/pedidos"
          element={
            <ProtectedRoute
              allowedRoles={[
                "USUARIO",
                "ADMIN",
              ]}
            >
              <OrdersPage />
            </ProtectedRoute>
          }
        />


        {/* ==================================
            RUTAS DEL DISTRIBUIDOR
        ================================== */}

        <Route
          path="/distribuidor"
          element={
            <ProtectedRoute
              allowedRoles={[
                "DISTRIBUIDOR",
              ]}
            >
              <DistributorHomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/distribuidor/perfil"
          element={
            <ProtectedRoute
              allowedRoles={[
                "DISTRIBUIDOR",
              ]}
            >
              <DistributorProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/distribuidor/lotes"
          element={
            <ProtectedRoute
              allowedRoles={[
                "DISTRIBUIDOR",
              ]}
            >
              <DistributorLotsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/distribuidor/pedidos"
          element={
            <ProtectedRoute
              allowedRoles={[
                "DISTRIBUIDOR",
              ]}
            >
              <DistributorOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/distribuidor/beneficios"
          element={
            <ProtectedRoute
              allowedRoles={[
                "DISTRIBUIDOR",
              ]}
            >
              <DistributorBenefitsPage />
            </ProtectedRoute>
          }
        />


        {/* ==================================
            RUTAS DEL ADMINISTRADOR
        ================================== */}

        <Route
          path="/admin/pedidos"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
              ]}
            >
              <AdminOrdersPage />
            </ProtectedRoute>
          }
        />


        {/* ==================================
            RUTA PARA PÁGINAS NO ENCONTRADAS
        ================================== */}

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