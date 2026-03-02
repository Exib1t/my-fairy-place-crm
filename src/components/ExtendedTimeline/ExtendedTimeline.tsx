"use client";

import { useCallback, useEffect, useState } from "react";
import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useExtendedGroupedOrders } from "@/components/Timeline/hooks";
import { useChangeOrderStatus } from "@/entities/orders/mutations";
import { useExtendedTimeline } from "@/entities/orders/queries";
import { ExtendedFutureSection } from "./ExtendedFutureSection/ExtendedFutureSection";

import "@/components/Timeline/Timeline.css";

const ExtendedTimeline = () => {
  const { data, isLoading, error } = useExtendedTimeline();

  const { futureDays } = useExtendedGroupedOrders(data);

  const { mutateAsync: changeStatus } = useChangeOrderStatus();

  const [orderId, setOrderId] = useState<string>("");

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const pressedKey = e.key;

      if (pressedKey === "Enter") {
        if (!Number.isNaN(orderId)) {
          changeStatus({
            order_id: Number(orderId),
            status_id: 7,
          }).finally(() => setOrderId(""));
        }
        return;
      }

      setOrderId(orderId + pressedKey);
    },
    [orderId, changeStatus],
  );

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);

  if (isLoading) {
    return <LoadingSpinner fullscreen />;
  }

  if (error) {
    return <ErrorMessage fullscreen />;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <main className="timeline-main">
      <div className="timeline-container">
        {/* Right side: Extended Future days (14 days) */}
        <ExtendedFutureSection futureDays={futureDays} />
      </div>
    </main>
  );
};

export default ExtendedTimeline;
