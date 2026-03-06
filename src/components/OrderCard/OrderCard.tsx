import { memo, useState } from "react";
import { NovaPostLogo } from "@/components/common/NovaPostLogo/NovaPostLogo";
import { OrderDetailsDialog } from "@/components/OrderDetailsDialog/OrderDetailsDialog";
import type { KeyCrmOrder } from "@/entities/orders/models";
import { ANIMATION, ORDER_STATUS } from "@/utils/constants";
import { formatDate, isOverdue } from "@/utils/date";

import "./OrderCard.css";
import ElectricBorder from "@/components/ui/ElectronicBorder/ElectronicBorder";

interface OrderCardProps {
  order: KeyCrmOrder;
  variant?: "large" | "medium";
  index?: number;
  showDate?: boolean;
}

export const OrderCard = memo(
  ({
    order,
    variant = "large",
    index = 0,
    showDate = true,
  }: OrderCardProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const overdue = isOverdue(order.shipping_date);
    const isNewOrder = order.status === ORDER_STATUS.NEW;
    const isManufacturedOrder = order.status === ORDER_STATUS.MANUFACTURED;

    const cardClasses = [
      "order-card",
      `order-card-${variant}`,
      overdue && "order-card-overdue",
      isNewOrder && "order-card-new",
      isManufacturedOrder && "order-card-manufactured",
    ]
      .filter(Boolean)
      .join(" ");

    const animationStyle = {
      animation: `fadeIn ${ANIMATION.FADE_IN_DURATION}s ease-out ${index * ANIMATION.STAGGER_DELAY}s both`,
    };

    return (
      <>
        {/*<ElectricBorder*/}
        {/*  chaos={0.05}*/}
        {/*  borderRadius={8}*/}
        {/*  color={*/}
        {/*    overdue*/}
        {/*      ? "#ff0000"*/}
        {/*      : isNewOrder || isManufacturedOrder*/}
        {/*        ? "#2eff0e"*/}
        {/*        : "#ffffff"*/}
        {/*  }*/}
        {/*>*/}
        {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
        <div
          className={cardClasses}
          style={animationStyle}
          onClick={() => setIsDialogOpen(true)}
        >
          {/* Background Image */}
          {order.product_image && (
            <div
              className="order-card-background"
              style={{ backgroundImage: `url(${order.product_image})` }}
            />
          )}

          {isManufacturedOrder && <div className={"order-card-tick"} />}

          <div className="order-card-content">
            {/* Source name */}

            <div className="order-card-source">{order.source_name}</div>

            {/* Order ID */}
            <div className="order-card-id">
              <div className="order-card-id-text">{order.id}</div>
            </div>

            {/* Child Name */}
            <div className="order-card-child-name">
              <div className="order-card-child-name-text">
                {order.child_name ?? "-"}
              </div>
            </div>

            {/* Shipping Date */}
            {showDate && order.shipping_date && (
              <div className="order-card-date">
                <div
                  className={`order-card-date-text ${overdue ? "order-card-date-overdue" : ""}`}
                >
                  {formatDate(order.shipping_date)}
                </div>
              </div>
            )}

            {/* Tracking Code */}
            {order.tracking_code && (
              <div className="order-card-tracking">
                <div className="order-card-tracking-header">
                  <NovaPostLogo width={variant === "large" ? 30 : 20} />
                </div>
                <div className="order-card-tracking-code">
                  {variant === "large" && "ТТН "}
                  {order.tracking_code}
                </div>
              </div>
            )}
          </div>
        </div>
        {/*</ElectricBorder>*/}

        {isDialogOpen && (
          <OrderDetailsDialog
            orderId={order.id}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        )}
      </>
    );
  },
);

OrderCard.displayName = "OrderCard";
