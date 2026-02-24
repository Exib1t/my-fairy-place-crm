"use client";

import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useTimeline } from "@/entities/orders/queries";
import { FutureSection } from "./FutureSection/FutureSection";
import { useGroupedOrders } from "./hooks";
import { TodaySection } from "./TodaySection/TodaySection";

import "./Timeline.css";

const Timeline = () => {
  const { data, isLoading, error } = useTimeline();

  const { todayAndOverdue, futureDays } = useGroupedOrders(data);

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
