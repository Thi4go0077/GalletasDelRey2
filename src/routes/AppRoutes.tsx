import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import CartPage from "../pages/CartPage";
import CatalogPage from "../pages/CatalogPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/carrito" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;