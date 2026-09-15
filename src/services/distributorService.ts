export interface DistributorOrder {
  id: string;
  date: string;
  lots: number;
  bags: number;
  baseTotal: number;
  discountRate: number;
  discountAmount: number;
  total: number;
  status: "PENDIENTE" | "CONFIRMADO";
}

const ORDERS_KEY = "distributor_orders";
const ANNUAL_CONTRACT_KEY = "distributor_annual_contract";

const BAG_PRICE = 2;
const BAGS_PER_LOT = 50;

export function getOrders(): DistributorOrder[] {
  const saved = localStorage.getItem(ORDERS_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved) as DistributorOrder[];
  } catch {
    return [];
  }
}

export function saveOrder(order: DistributorOrder): void {
  const orders = getOrders();

  orders.unshift(order);

  localStorage.setItem(
    ORDERS_KEY,
    JSON.stringify(orders),
  );
}

export function getCurrentMonthLots(): number {
  const now = new Date();

  const month = now.getMonth();
  const year = now.getFullYear();

  return getOrders()
    .filter((order) => {
      const orderDate = new Date(order.date);

      return (
        orderDate.getMonth() === month &&
        orderDate.getFullYear() === year &&
        order.status === "CONFIRMADO"
      );
    })
    .reduce((total, order) => total + order.lots, 0);
}

export function getDiscountRate(
  lots: number,
  annualContract: boolean,
): number {
  if (annualContract && lots >= 6) {
    return 0.2;
  }

  if (lots >= 6) {
    return 0.15;
  }

  if (lots >= 3) {
    return 0.1;
  }

  if (lots >= 1) {
    return 0.05;
  }

  return 0;
}

export function getDistributorLevel(
  lots: number,
): {
  level: string;
  discount: number;
  description: string;
} {
  if (lots >= 6) {
    return {
      level: "Nivel 3",
      discount: 0.15,
      description: "6 lotes o más al mes",
    };
  }

  if (lots >= 3) {
    return {
      level: "Nivel 2",
      discount: 0.1,
      description: "3 a 5 lotes al mes",
    };
  }

  return {
    level: "Nivel 1",
    discount: 0.05,
    description: "1 a 2 lotes al mes",
  };
}

export function hasAnnualContract(): boolean {
  return (
    localStorage.getItem(ANNUAL_CONTRACT_KEY) === "true"
  );
}

export function setAnnualContract(
  enabled: boolean,
): void {
  localStorage.setItem(
    ANNUAL_CONTRACT_KEY,
    String(enabled),
  );
}

export const distributorPricing = {
  BAG_PRICE,
  BAGS_PER_LOT,
};
