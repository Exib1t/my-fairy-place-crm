"use client";

import { useEffect } from "react";
import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useExtendedGroupedOrders } from "@/components/Timeline/hooks";
import { useExtendedTimeline } from "@/entities/orders/queries";
import { ExtendedFutureSection } from "./ExtendedFutureSection/ExtendedFutureSection";

import "@/components/Timeline/Timeline.css";

const ExtendedTimeline = () => {
  const { data, isLoading, error } = useExtendedTimeline();

  const { futureDays } = useExtendedGroupedOrders(data);

  const lockToLandscape = async () => {
    if (screen.orientation && "lock" in screen.orientation) {
      try {
        await (screen.orientation?.lock as (type: string) => Promise<void>)(
          "landscape",
        );
        console.log("Screen orientation locked to landscape");
      } catch (err) {
        console.error("Orientation lock failed:", err);
      }
    }
  };

  useEffect(() => {
    lockToLandscape();
  });

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
