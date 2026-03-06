"use client";

import { useCallback, useEffect, useState } from "react";
import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useChangeOrderStatus } from "@/entities/orders/mutations";
import { useTimeline } from "@/entities/orders/queries";
import { FutureSection } from "./FutureSection/FutureSection";
import { useGroupedOrders } from "./hooks";
import { TodaySection } from "./TodaySection/TodaySection";

import "./Timeline.css";
import Galaxy from "@/components/ui/GalaxyBg/GalaxyBg";

const Timeline = () => {
  const { data, isLoading, error } = useTimeline();

  const { todayAndOverdue, futureDays } = useGroupedOrders(data);

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
      <Galaxy />
      <div className="timeline-container">
        {/* Left side: Today & Overdue orders */}
        <TodaySection orders={todayAndOverdue} />

        {/* Divider */}
        <div className="timeline-divider" />

        {/* Right side: Future days */}
        <FutureSection futureDays={futureDays} />
      </div>
    </main>
  );
};

export default Timeline;
