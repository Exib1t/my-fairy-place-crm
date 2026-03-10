import { memo, useCallback, useEffect, useRef, useState } from "react";
import { OrderDetailsDialog } from "@/components/OrderDetailsDialog/OrderDetailsDialog";
import type { KeyCrmOrder } from "@/entities/orders/models";
import { ORDER_STATUS } from "@/utils/constants";
import "./CompactOrderCard.css";

interface CompactOrderCardProps {
  order: KeyCrmOrder;
}

export const CompactOrderCard = memo(({ order }: CompactOrderCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isNewOrder = order.status === ORDER_STATUS.NEW;
  const isManufacturedOrder = order.status === ORDER_STATUS.MANUFACTURED;

  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
  }, []);

  const resetInactivityTimer = useCallback(() => {
    clearInactivityTimer();
    inactivityTimer.current = setTimeout(() => setIsDialogOpen(false), 60_000);
  }, [clearInactivityTimer]);

  // Запускаем таймер при открытии, чистим при закрытии
  useEffect(() => {
    if (isDialogOpen) {
      resetInactivityTimer();
    } else {
      clearInactivityTimer();
    }
    return clearInactivityTimer;
  }, [isDialogOpen, resetInactivityTimer, clearInactivityTimer]);

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
    <>
      <div className={cardClasses} onClick={() => setIsDialogOpen(true)}>
        {isManufacturedOrder && <div className={"order-card-tick-compact"} />}
        <div className="compact-order-card-id">{order.id}</div>
      </div>

      {isDialogOpen && (
        <OrderDetailsDialog
          orderId={order.id}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onMouseMove={resetInactivityTimer}
        />
      )}
    </>
  );
});

CompactOrderCard.displayName = "CompactOrderCard";
