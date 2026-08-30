import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { products } from "../data/products";
import { authRepository } from "../repositories/authRepository";
import { cartService } from "../services/cartService";
import type { PaymentMethod } from "../types/cart";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-BO", {
    currency: "BOB",
    style: "currency",
  }).format(value);
}

function getDiscountRate(totalBoxes: number): number {
  if (totalBoxes >= 10) {
    return 0.15;
  }

  if (totalBoxes >= 5) {
    return 0.05;
  }

  return 0;
}

function CartPage() {
  const user = authRepository.getCurrentUser();
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash");
  const [purchaseMessage, setPurchaseMessage] = useState("");

  const quantities = cartService.getQuantities();

  const selectedProducts = useMemo(
    () => products.filter((product) => quantities[product.id] > 0),
    [quantities],
  );

  // Subtotal de todos los productos
  const subtotal = selectedProducts.reduce(
    (total, product) =>
      total + quantities[product.id] * product.unitPrice,
    0,
  );

  // Cantidad total de unidades del carrito
  const totalUnits = selectedProducts.reduce(
    (total, product) => total + quantities[product.id],
    0,
  );

  // Cada caja contiene 10 unidades
  const totalBoxes = totalUnits / 10;

  // Descuento automático según la cantidad total de cajas
  const discountRate = getDiscountRate(totalBoxes);

  // Monto del descuento
  const volumeDiscount = subtotal * discountRate;

  // Total final
  const total = Math.max(0, subtotal - volumeDiscount);

  const handlePurchase = () => {
  const readablePaymentMethod =
    paymentMethod === "cash"
      ? "pago en efectivo"
      : "pago con QR";

  cartService.setQuantities({
    coco: 0,
    avena: 0,
    limon: 0,
    frutilla: 0,
  });

  setPurchaseMessage(
    `Pedido preparado con ${readablePaymentMethod}. La confirmación se implementará en una próxima etapa.`,
  );
};

  return (
    <>
      <Navbar user={user} />

      <main className="cart-page">
        <section className="cart-hero" aria-labelledby="cart-title">
          <p className="cart-hero__eyebrow">
            Compra más y paga menos
          </p>

          <h1 id="cart-title">Mi Carrito</h1>

          <p className="cart-hero__description">
            Descuentos automáticos por volumen
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
                    </tr>
                  </thead>

                  <tbody>
                    {selectedProducts.map((product) => {
                      const quantity = quantities[product.id];

                      const productTotal =
                        quantity * product.unitPrice;

                      const boxes = product.unitsPerBox
                        ? `${(
                            quantity / product.unitsPerBox
                          ).toFixed(2)} cajas`
                        : "Pendiente de definir";

                      return (
                        <tr key={product.id}>
                          <td data-label="Producto">
                            {product.name}
                          </td>

                          <td data-label="Cantidad">
                            {quantity}
                          </td>

                          <td data-label="Cantidad en cajas">
                            {boxes}
                          </td>

                          <td data-label="Precio por unidad">
                            {formatCurrency(product.unitPrice)}
                          </td>

                          <td data-label="Total">
                            {formatCurrency(productTotal)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div
                className="cart-summary"
                aria-label="Resumen del pedido"
              >
                <div>
                  <span>Subtotal</span>
                  <strong>{formatCurrency(subtotal)}</strong>
                </div>

                <div>
                  <span>
                    Descuento por volumen ({discountRate * 100}%)
                  </span>

                  <strong>
                    {formatCurrency(volumeDiscount)}
                  </strong>
                </div>

                <div className="cart-summary__total">
                  <span>Total</span>
                  <strong>{formatCurrency(total)}</strong>
                </div>
              </div>

              <fieldset className="payment-options">
                <legend>Método de pago</legend>

                <label>
                  <input
                    checked={paymentMethod === "cash"}
                    name="payment-method"
                    onChange={() =>
                      setPaymentMethod("cash")
                    }
                    type="radio"
                  />

                  Pagar en efectivo
                </label>

                <label>
                  <input
                    checked={paymentMethod === "qr"}
                    name="payment-method"
                    onChange={() =>
                      setPaymentMethod("qr")
                    }
                    type="radio"
                  />

                  Pagar con QR
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
                <p className="purchase-message">
                  {purchaseMessage}
                </p>
              ) : null}
            </>
          ) : (
            <div className="cart-empty">
              <h2>
                Todavía no seleccionaste productos.
              </h2>

              <p>
                Vuelve al catálogo para elegir tus
                sabores favoritos.
              </p>
            </div>
          )}

          <Link
            className="cart-back-link"
            to="/#sabores"
          >
            Volver al catálogo
          </Link>
        </section>
      </main>
    </>
  );
}

export default CartPage;