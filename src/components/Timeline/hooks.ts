import { useMemo } from "react";
import type { KeyCrmOrder } from "@/entities/orders/models";
import { getDayOfWeek, isOverdue, isToday } from "@/utils/date";
import type { FutureDaysData } from "./FutureSection/FutureSection";

interface GroupedOrders {
  todayAndOverdue: KeyCrmOrder[];
  futureDays: FutureDaysData;
}

/**
 * Groups orders into today/overdue section and future days columns
 * @param orders - Array of orders to group
 * @returns Object with todayAndOverdue array and futureDays object
 */
export const useGroupedOrders = (orders?: KeyCrmOrder[]): GroupedOrders => {
  return useMemo(() => {
    if (!orders)
      return { todayAndOverdue: [], futureDays: {} } as GroupedOrders;

    const todayAndOverdue: KeyCrmOrder[] = [];
    const futureDays: FutureDaysData = {
      1: [], // Monday
      2: [], // Tuesday
      3: [], // Wednesday
      4: [], // Thursday
      5: [], // Friday
      6: [], // Saturday
      7: [], // Sunday
    };

    orders.forEach((order) => {
      const dayOfWeek = getDayOfWeek(order.shipping_date);

      // Add to todayAndOverdue section if order is today or overdue
      if (isToday(order.shipping_date) || isOverdue(order.shipping_date)) {
        todayAndOverdue.push(order);
      }

      // Also add to future days column if it's not overdue
      if (!isOverdue(order.shipping_date) && dayOfWeek >= 1 && dayOfWeek <= 7) {
        futureDays[dayOfWeek as keyof FutureDaysData].push(order);
      }
    });

    return { todayAndOverdue, futureDays };
  }, [orders]);
};

export type ExtendedFutureDaysData = {
  [key: number]: KeyCrmOrder[];
};

interface ExtendedGroupedOrders {
  todayAndOverdue: KeyCrmOrder[];
  futureDays: ExtendedFutureDaysData;
}

/**
 * Groups orders into today/overdue section and future 14 days columns
 * @param orders - Array of orders to group
 * @returns Object with todayAndOverdue array and futureDays object (14 days)
 */
export const useExtendedGroupedOrders = (
  orders?: KeyCrmOrder[],
): ExtendedGroupedOrders => {
  return useMemo(() => {
    if (!orders)
      return { todayAndOverdue: [], futureDays: {} } as ExtendedGroupedOrders;

    const todayAndOverdue: KeyCrmOrder[] = [];
    const futureDays: ExtendedFutureDaysData = {};

    // Initialize 14 days
    for (let i = 0; i < 14; i++) {
      futureDays[i] = [];
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    orders.forEach((order) => {
      // Add to todayAndOverdue section if order is today or overdue
      if (isOverdue(order.shipping_date)) {
        futureDays[0].push(order);
      }

      // Add to future days if it's within 14 days and not overdue
      if (!isOverdue(order.shipping_date) && order.shipping_date) {
        const orderDate = new Date(order.shipping_date);
        orderDate.setHours(0, 0, 0, 0);

        const diffTime = orderDate.getTime() - today.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays < 14) {
          futureDays[diffDays].push(order);
        }
      }
    });

    return { todayAndOverdue, futureDays };
  }, [orders]);
};
