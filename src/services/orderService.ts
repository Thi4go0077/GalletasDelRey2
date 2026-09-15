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
  ): void {
    const orders = getOrders();

    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status }
        : order,
    );

    localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify(updatedOrders),
    );
  },
};