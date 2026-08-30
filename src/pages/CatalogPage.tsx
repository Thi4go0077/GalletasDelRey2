import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { products } from "../data/products";
import { authRepository } from "../repositories/authRepository";
import { cartService } from "../services/cartService";
import type { ProductId } from "../types/cart";
import "./CatalogPage.css";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-BO", {
    currency: "BOB",
    style: "currency",
  }).format(value);
}

function CatalogPage() {
  const user = authRepository.getCurrentUser();
  const [quantities, setQuantities] = useState(() =>
    cartService.getQuantities(),
  );

  const updateQuantity = (productId: ProductId, change: number) => {
    const currentQuantity = quantities[productId] ?? 0;
    const nextQuantity = Math.max(0, currentQuantity + change);

    const nextQuantities = {
      ...quantities,
      [productId]: nextQuantity,
    };

    setQuantities(nextQuantities);
    cartService.setQuantities(nextQuantities);
  };

  return (
    <>
      <Navbar user={user} />

      <main className="catalog-page">
        <section className="catalog-hero">
          <p className="catalog-eyebrow">GALLETAS DEL REY</p>

          <h1>Todos los sabores</h1>

          <p>
            Descubre nuestra variedad de galletas artesanales y elige tus
            favoritas.
          </p>
        </section>

        <div className="catalog-layout">
          <aside className="catalog-sidebar">
            <h2>Menú</h2>

            <nav>
              <Link to="/">Inicio</Link>

              <Link to="/catalogo" className="active">
                Catálogo
              </Link>

              <Link to="/carrito">
                🛒 Ver carrito
              </Link>
            </nav>
          </aside>

          <section
            className="catalog-products"
            aria-label="Todos los sabores"
          >
            {products.map((product) => {
              const quantity = quantities[product.id] ?? 0;

              return (
                <article className="catalog-card" key={product.id}>
                  <img
                    src={product.image}
                    alt={product.alt}
                  />

                  <div className="catalog-card-content">
                    <h2>{product.name}</h2>

                    <p className="catalog-price">
                      {formatCurrency(product.unitPrice)}
                      <span> / unidad</span>
                    </p>

                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, -1)
                        }
                        aria-label={`Quitar una unidad de ${product.name}`}
                      >
                        −
                      </button>

                      <span>{quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, 1)
                        }
                        aria-label={`Agregar una unidad de ${product.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </main>
    </>
  );
}

export default CatalogPage;