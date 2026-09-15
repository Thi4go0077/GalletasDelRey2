import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import {
  products,
  type ProductCategory,
} from "../data/products";
import { authRepository } from "../repositories/authRepository";
import { cartService } from "../services/cartService";
import type { ProductId } from "../types/cart";
import "./CatalogPage.css";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: "BOB",
  }).format(value);
}

type CategoryFilter = "Todos" | ProductCategory;

function CatalogPage() {
  const user = authRepository.getCurrentUser();

  const [quantities, setQuantities] = useState(() =>
    cartService.getQuantities(),
  );

  const [inputValues, setInputValues] = useState<
    Record<ProductId, string>
  >(() => {
    const currentQuantities = cartService.getQuantities();

    return products.reduce(
      (values, product) => ({
        ...values,
        [product.id]: String(currentQuantities[product.id] ?? 0),
      }),
      {} as Record<ProductId, string>,
    );
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Todos");

  const updateQuantity = (
    productId: ProductId,
    change: number,
  ) => {
    const currentQuantity = quantities[productId] ?? 0;

    const nextQuantity = Math.max(
      0,
      currentQuantity + change,
    );

    const nextQuantities = {
      ...quantities,
      [productId]: nextQuantity,
    };

    setQuantities(nextQuantities);

    setInputValues((current) => ({
      ...current,
      [productId]: String(nextQuantity),
    }));

    cartService.setQuantities(nextQuantities);
  };

  const handleQuantityChange = (
    productId: ProductId,
    value: string,
  ) => {
    if (value === "") {
      setInputValues((current) => ({
        ...current,
        [productId]: "",
      }));

      return;
    }

    if (!/^\d+$/.test(value)) {
      return;
    }

    const nextQuantity = Math.max(
      0,
      Number(value),
    );

    setInputValues((current) => ({
      ...current,
      [productId]: value,
    }));

    const nextQuantities = {
      ...quantities,
      [productId]: nextQuantity,
    };

    setQuantities(nextQuantities);
    cartService.setQuantities(nextQuantities);
  };

  const handleQuantityBlur = (
    productId: ProductId,
  ) => {
    const value = inputValues[productId];

    if (value === "") {
      const nextQuantities = {
        ...quantities,
        [productId]: 0,
      };

      setQuantities(nextQuantities);

      setInputValues((current) => ({
        ...current,
        [productId]: "0",
      }));

      cartService.setQuantities(nextQuantities);
    }
  };

  const filteredProducts = products.filter((product) => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    const matchesSearch =
      normalizedSearch === "" ||
      product.name
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesCategory =
      selectedCategory === "Todos" ||
      product.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar user={user} />

      <main className="catalog-page">
        <section className="catalog-hero">
          <p className="catalog-eyebrow">
            GALLETAS DEL REY
          </p>

          <h1>Todos los sabores</h1>

          <p>
            Descubre nuestra variedad de galletas artesanales
            y elige tus favoritas.
          </p>
        </section>

        <div className="catalog-layout">
          <aside className="catalog-sidebar">
            <h2>Menú</h2>

            <nav>
              <Link to="/inicio">
                Inicio
              </Link>

              <Link
                to="/catalogo"
                className="active"
              >
                Catálogo
              </Link>

              <Link to="/carrito">
                🛒 Ver carrito
              </Link>
            </nav>
          </aside>

          <section className="catalog-content">
            <div className="catalog-tools">
              <div className="catalog-search">
                <label htmlFor="catalog-search">
                  Buscar sabor
                </label>

                <input
                  id="catalog-search"
                  type="search"
                  placeholder="🔍 Buscar un sabor..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                />
              </div>

              <div className="catalog-categories">
                <span className="categories-label">
                  Categorías
                </span>

                <div className="category-buttons">
                  <button
                    type="button"
                    className={
                      selectedCategory === "Todos"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedCategory("Todos")
                    }
                  >
                    Todos
                  </button>

                  <button
                    type="button"
                    className={
                      selectedCategory === "Populares"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedCategory("Populares")
                    }
                  >
                    Más populares
                  </button>

                  <button
                    type="button"
                    className={
                      selectedCategory === "Clásicas"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedCategory("Clásicas")
                    }
                  >
                    Clásicas
                  </button>

                  <button
                    type="button"
                    className={
                      selectedCategory === "Especiales"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedCategory("Especiales")
                    }
                  >
                    Especiales
                  </button>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-results">
                <h2>
                  No encontramos ese sabor
                </h2>

                <p>
                  Prueba con otro nombre o selecciona otra
                  categoría.
                </p>
              </div>
            ) : (
              <section
                className="catalog-products"
                aria-label="Todos los sabores"
              >
                {filteredProducts.map((product) => {
                  const quantity =
                    quantities[product.id] ?? 0;

                  const inputValue =
                    inputValues[product.id] ??
                    String(quantity);

                  return (
                    <article
                      className="catalog-card"
                      key={product.id}
                    >
                      <img
                        src={product.image}
                        alt={product.alt}
                      />

                      <div className="catalog-card-content">
                        <h2>
                          {product.name}
                        </h2>

                        <p className="catalog-price">
                          {formatCurrency(
                            product.unitPrice,
                          )}
                          <span>
                            {" "}
                            / unidad
                          </span>
                        </p>

                        <div className="quantity-control">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                -1,
                              )
                            }
                            aria-label={`Quitar una unidad de ${product.name}`}
                          >
                            −
                          </button>

                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={inputValue}
                            onChange={(event) =>
                              handleQuantityChange(
                                product.id,
                                event.target.value,
                              )
                            }
                            onBlur={() =>
                              handleQuantityBlur(
                                product.id,
                              )
                            }
                            aria-label={`Cantidad de ${product.name}`}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                1,
                              )
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
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default CatalogPage;