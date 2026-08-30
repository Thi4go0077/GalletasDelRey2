import type { ProductId } from "../types/cart";

export interface Product {
  id: ProductId;
  name: string;
  image: string;
  alt: string;
  unitPrice: number;
  unitsPerBox: number | null;
}

export const products: Product[] = [
  {
    id: "coco",
    name: "Coco",
    image:
      "https://images.unsplash.com/photo-1436564989038-18b9958df72b?auto=format&fit=crop&w=700&q=80",
    alt: "Galletas artesanales doradas con detalles de coco",
    unitPrice: 2,
    unitsPerBox: 10,
  },
  {
    id: "avena",
    name: "Avena",
    image:
      "https://images.unsplash.com/photo-1631311253861-52eaf0337adb?auto=format&fit=crop&w=700&q=80",
    alt: "Galletas de avena apiladas en una mesa",
    unitPrice: 2,
    unitsPerBox: 10,
  },
  {
    id: "limon",
    name: "Limón",
    image:
      "https://images.unsplash.com/photo-1744160252920-967ab9b733ce?auto=format&fit=crop&w=700&q=80",
    alt: "Galletas de limón con una presentación clara y fresca",
    unitPrice: 2,
    unitsPerBox: 10,
  },
  {
    id: "frutilla",
    name: "Frutilla",
    image:
      "https://images.unsplash.com/photo-1748185689409-e2cbe764d644?auto=format&fit=crop&w=700&q=80",
    alt: "Galletas acompañadas con frutillas frescas",
    unitPrice: 2,
    unitsPerBox: 10,
  },
];

export const initialCartQuantities = products.reduce(
  (quantities, product) => ({
    ...quantities,
    [product.id]: 0,
  }),
  {} as Record<ProductId, number>,
);
