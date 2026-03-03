import { memo } from "react";
import type { KeyCrmOrder } from "@/entities/orders/models";
import { ORDER_STATUS } from "@/utils/constants";
import "./CompactOrderCard.css";

interface CompactOrderCardProps {
  order: KeyCrmOrder;
}

export const CompactOrderCard = memo(({ order }: CompactOrderCardProps) => {
  const isNewOrder = order.status === ORDER_STATUS.NEW;
  const isManufacturedOrder = order.status === ORDER_STATUS.MANUFACTURED;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isOverdue = order.shipping_date
    ? new Date(order.shipping_date) < today
    : false;

  const cardClasses = [
    "compact-order-card",
    isNewOrder && "compact-order-card-new",
    isOverdue && "compact-order-card-overdue",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses}>
      {isManufacturedOrder && <div className={"order-card-tick-compact"} />}
      <div className="compact-order-card-id">{order.id}</div>
    </div>
  );
});

CompactOrderCard.displayName = "CompactOrderCard";
