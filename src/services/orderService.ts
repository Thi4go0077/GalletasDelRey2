
import type { Order, OrderStatus } from "../types/order";

const ORDERS_KEY = "galletas_del_rey_orders";

function getOrders(): Order[] {
  const savedOrders = localStorage.getItem(ORDERS_KEY);

  if (!savedOrders) {
    return [];
  }

  try {
    return JSON.parse(savedOrders) as Order[];
  } catch {
    return [];
  }
}

export const orderService = {
  getAll(): Order[] {
    return getOrders();
  },

  getByUser(userId: string): Order[] {
    return getOrders().filter(
      (order) => order.userId === userId,
    );
  },

  create(order: Order): void {
    const orders = getOrders();

    orders.unshift(order);

    localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify(orders),
    );
  },

  updateStatus(
    orderId: string,
    status: OrderStatus,
    rejectionReason?: string,
  ): void {
    const orders = getOrders();

    const updatedOrders = orders.map((order) => {
      if (order.id !== orderId) {
        return order;
      }

      return {
        ...order,
        status,
        rejectionReason:
          status === "RECHAZADO"
            ? rejectionReason?.trim() || "No se especificó un motivo."
            : undefined,
      };
    });

    localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify(updatedOrders),
    );
  },
};
