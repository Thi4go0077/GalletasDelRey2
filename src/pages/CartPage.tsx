import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";

import { products } from "../data/products";

import { authRepository } from "../repositories/authRepository";

import { cartService } from "../services/cartService";
import { orderService } from "../services/orderService";

import type {
  PaymentMethod,
  ProductId,
} from "../types/cart";

import "./CartPage.css";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-BO", {
    currency: "BOB",
    style: "currency",
  }).format(value);
}

function CartPage() {
  const user = authRepository.getCurrentUser();

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash");

  const [purchaseMessage, setPurchaseMessage] =
    useState("");

  const [quantities, setQuantities] = useState(() =>
    cartService.getQuantities(),
  );

  const selectedProducts = useMemo(
    () =>
      products.filter(
        (product) => (quantities[product.id] ?? 0) > 0,
      ),
    [quantities],
  );

  const subtotal = selectedProducts.reduce(
    (total, product) =>
      total +
      (quantities[product.id] ?? 0) *
        product.unitPrice,
    0,
  );

  // Los clientes normales no tienen descuentos.
  const total = subtotal;

  const totalProducts =
    selectedProducts.reduce(
      (totalProducts, product) =>
        totalProducts +
        (quantities[product.id] ?? 0),
      0,
    );

  const updateQuantity = (
    productId: ProductId,
    change: number,
  ) => {
    const currentQuantity =
      quantities[productId] ?? 0;

    const nextQuantity = Math.max(
      0,
      currentQuantity + change,
    );

    const nextQuantities = {
      ...quantities,
      [productId]: nextQuantity,
    };

    setQuantities(nextQuantities);
    cartService.setQuantities(nextQuantities);

    setPurchaseMessage("");
  };

  const removeProduct = (
    productId: ProductId,
  ) => {
    const nextQuantities = {
      ...quantities,
      [productId]: 0,
    };

    setQuantities(nextQuantities);
    cartService.setQuantities(nextQuantities);

    setPurchaseMessage("");
  };

  const handlePurchase = () => {
    if (!user) {
      setPurchaseMessage(
        "Debes iniciar sesión para realizar una compra.",
      );
      return;
    }

    if (selectedProducts.length === 0) {
      setPurchaseMessage(
        "Tu carrito está vacío.",
      );
      return;
    }

    /*
     * Creamos los productos del pedido
     */
    const orderItems = selectedProducts.map(
      (product) => {
        const quantity =
          quantities[product.id] ?? 0;

        return {
          productId: product.id,
          productName: product.name,
          quantity,
          unitPrice: product.unitPrice,
          total:
            quantity * product.unitPrice,
        };
      },
    );

    /*
     * Creamos el pedido
     */
    const newOrder = {
      id: `PED-${Date.now()}`,
      userId: user.id,
      date: new Date().toISOString(),
      items: orderItems,
      subtotal,
      total,
      paymentMethod,
      status: "PENDIENTE" as const,
    };

    /*
     * Guardamos el pedido
     */
    orderService.create(newOrder);

    const readablePaymentMethod =
      paymentMethod === "cash"
        ? "pago en efectivo"
        : "pago con QR";

    /*
     * Vaciar carrito
     */
    const emptyCart = Object.keys(
      quantities,
    ).reduce(
      (result, productId) => ({
        ...result,
        [productId]: 0,
      }),
      {} as typeof quantities,
    );

    setQuantities(emptyCart);
    cartService.setQuantities(emptyCart);

    /*
     * Mensaje de confirmación
     */
    setPurchaseMessage(
      `¡Pedido ${newOrder.id} creado correctamente! Método: ${readablePaymentMethod}.`,
    );
  };

  return (
    <>
      <Navbar user={user} />

      <main className="cart-page">
        <section
          className="cart-hero"
          aria-labelledby="cart-title"
        >
          <p className="cart-hero__eyebrow">
            Tu carrito de compras
          </p>

          <h1 id="cart-title">
            Mi Carrito
          </h1>

          <p className="cart-hero__description">
            Revisa tus productos antes de realizar tu pedido.
          </p>
        </section>

        <section
          className="cart-panel"
          aria-label="Detalle del carrito"
        >
          {selectedProducts.length > 0 ? (
            <>
              <div className="cart-table-wrapper">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Cantidad en cajas</th>
                      <th>Precio por unidad</th>
                      <th>Total</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedProducts.map(
                      (product) => {
                        const quantity =
                          quantities[product.id] ?? 0;

                        const productTotal =
                          quantity *
                          product.unitPrice;

                        const boxes =
                          product.unitsPerBox
                            ? `${(
                                quantity /
                                product.unitsPerBox
                              ).toFixed(2)} cajas`
                            : "Pendiente de definir";

                        return (
                          <tr key={product.id}>
                            <td data-label="Producto">
                              <div className="cart-product">
                                <img
                                  src={product.image}
                                  alt={product.alt}
                                  className="cart-product__image"
                                />

                                <span>
                                  {product.name}
                                </span>
                              </div>
                            </td>

                            <td data-label="Cantidad">
                              <div className="cart-quantity">
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

                                <span>
                                  {quantity}
                                </span>

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
                            </td>

                            <td data-label="Cantidad en cajas">
                              {boxes}
                            </td>

                            <td data-label="Precio por unidad">
                              {formatCurrency(
                                product.unitPrice,
                              )}
                            </td>

                            <td data-label="Total">
                              <strong>
                                {formatCurrency(
                                  productTotal,
                                )}
                              </strong>
                            </td>

                            <td data-label="Acciones">
                              <button
                                type="button"
                                className="cart-remove"
                                onClick={() =>
                                  removeProduct(
                                    product.id,
                                  )
                                }
                                aria-label={`Eliminar ${product.name} del carrito`}
                              >
                                🗑️ Eliminar
                              </button>
                            </td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                </table>
              </div>

              <div
                className="cart-summary"
                aria-label="Resumen del pedido"
              >
                <div>
                  <span>
                    Productos
                  </span>

                  <strong>
                    {totalProducts}
                  </strong>
                </div>

                <div>
                  <span>
                    Subtotal
                  </span>

                  <strong>
                    {formatCurrency(
                      subtotal,
                    )}
                  </strong>
                </div>

                <div className="cart-summary__total">
                  <span>
                    Total
                  </span>

                  <strong>
                    {formatCurrency(
                      total,
                    )}
                  </strong>
                </div>
              </div>

              <fieldset className="payment-options">
                <legend>
                  Método de pago
                </legend>

                <label>
                  <input
                    checked={
                      paymentMethod === "cash"
                    }
                    name="payment-method"
                    onChange={() =>
                      setPaymentMethod(
                        "cash",
                      )
                    }
                    type="radio"
                  />

                  <span>
                    💵 Pagar en efectivo
                  </span>
                </label>

                <label>
                  <input
                    checked={
                      paymentMethod === "qr"
                    }
                    name="payment-method"
                    onChange={() =>
                      setPaymentMethod(
                        "qr",
                      )
                    }
                    type="radio"
                  />

                  <span>
                    📱 Pagar con QR
                  </span>
                </label>
              </fieldset>

              <button
                className="purchase-button"
                onClick={handlePurchase}
                type="button"
              >
                COMPRAR
              </button>

              {purchaseMessage ? (
                <p
                  className="purchase-message"
                  role="status"
                >
                  {purchaseMessage}
                </p>
              ) : null}
            </>
          ) : (
            <div className="cart-empty">
              <div className="cart-empty__icon">
                🛒
              </div>

              <h2>
                {purchaseMessage
                  ? "¡Pedido realizado!"
                  : "Tu carrito está vacío"}
              </h2>

              <p>
                {purchaseMessage
                  ? purchaseMessage
                  : "Agrega algunas de nuestras deliciosas galletas para comenzar tu pedido."}
              </p>

              <Link
                className="cart-empty__button"
                to="/catalogo"
              >
                🍪 Ver catálogo
              </Link>
            </div>
          )}

          <Link
            className="cart-back-link"
            to="/catalogo"
          >
            ← Volver al catálogo
          </Link>
        </section>
      </main>
    </>
  );
}

export default CartPage;