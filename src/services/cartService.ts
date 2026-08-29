import { products, initialCartQuantities } from "../data/products";
import { storageService } from "./storageService";
import type { CartQuantities, ProductId } from "../types/cart";

const CART_STORAGE_KEY = "galletas-del-rey-cart";

function normalizeQuantity(value: unknown): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.floor(value));
}

export const cartService = {
  getQuantities(): CartQuantities {
    const storedQuantities = storageService.get<Partial<CartQuantities>>(CART_STORAGE_KEY);

    return products.reduce(
      (quantities, product) => ({
        ...quantities,
        [product.id]: normalizeQuantity(storedQuantities?.[product.id]),
      }),
      { ...initialCartQuantities },
    );
  },

  setQuantities(quantities: CartQuantities): void {
    const normalizedQuantities = products.reduce(
      (nextQuantities, product) => ({
        ...nextQuantities,
        [product.id]: normalizeQuantity(quantities[product.id]),
      }),
      { ...initialCartQuantities },
    );

    storageService.set(CART_STORAGE_KEY, normalizedQuantities);
  },

  updateQuantity(productId: ProductId, quantity: number): CartQuantities {
    const quantities = this.getQuantities();
    const nextQuantities = {
      ...quantities,
      [productId]: normalizeQuantity(quantity),
    };

    this.setQuantities(nextQuantities);

    return nextQuantities;
  },
};
