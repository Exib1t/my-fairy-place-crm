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
