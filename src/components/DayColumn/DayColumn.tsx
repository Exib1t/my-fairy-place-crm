import { memo } from "react";
import { CompactOrderCard } from "@/components/CompactOrderCard/CompactOrderCard";
import type { KeyCrmOrder } from "@/entities/orders/models";

import "./DayColumn.css";

interface DayColumnProps {
  dayName: string;
  dayDate: string;
  orders: KeyCrmOrder[];
  isToday?: boolean;
}

export const DayColumn = memo(
  ({ dayName, dayDate, orders, isToday = false }: DayColumnProps) => {
    const isWeekend = dayName === "НД" || dayName === "СБ";

    const columnClasses = [
      "day-column",
      isToday && "day-column-today",
      isWeekend && "day-column-weekend",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={columnClasses}>
        {/* Day Header */}
        <div className="day-column-header">
          <div className="day-column-info">
            <h2 className="day-column-name">{dayName}</h2>
            <div className="day-column-date">{dayDate}</div>
          </div>
          <div className="day-column-count">{orders.length}</div>
        </div>

        {/* Orders Container */}
        <div className="day-column-orders">
          {orders.map((order) => (
            <CompactOrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    );
  },
);

DayColumn.displayName = "DayColumn";
