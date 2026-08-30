export type ProductId = "coco" | "avena" | "limon" | "frutilla" | "mantequilla" | "pistacho" | "naranja" | "miel" | "arandanos" | "pasas al ron";

export type CartQuantities = Record<ProductId, number>;

export type PaymentMethod = "cash" | "qr";
