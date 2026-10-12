import type { Order, OrderStatus } from "../types/order";

const ORDERS_KEY = "galletas_del_rey_orders";

function getOrders(): Order[] {
  const savedOrders = localStorage.getItem(ORDERS_KEY);

  if (!savedOrders) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(savedOrders);
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    console.error("No se pudieron leer los pedidos guardados.");
    return [];
  }
}

function saveOrders(orders: Order[]): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export const orderService = {
  // Obtener todos los pedidos.
  getAll(): Order[] {
    return getOrders();
  },

  // Obtener los pedidos de un usuario.
  getByUser(userId: string): Order[] {
    return getOrders().filter((order) => order.userId === userId);
  },

  // Crear un pedido.
  create(order: Order): void {
    const orders = getOrders();

    orders.unshift(order);
    saveOrders(orders);
  },

  // Cambiar el estado de un pedido.
  updateStatus(
    orderId: string,
    status: OrderStatus,
    rejectionReason?: string,
  ): boolean {
    const orders = getOrders();
    const index = orders.findIndex((order) => order.id === orderId);

    if (index === -1) {
      return false;
    }

    const updatedOrders = [...orders];

    updatedOrders[index] = {
      ...updatedOrders[index],
      status,
      rejectionReason:
        status === "RECHAZADO"
          ? rejectionReason?.trim() || "No se especificó un motivo."
          : undefined,
    };

    saveOrders(updatedOrders);
    return true;
  },

  // Eliminar un pedido definitivamente del almacenamiento local.
  delete(orderId: string): boolean {
    const orders = getOrders();
    const updatedOrders = orders.filter((order) => order.id !== orderId);

    if (updatedOrders.length === orders.length) {
      return false;
    }

    saveOrders(updatedOrders);
    return true;
  },
};