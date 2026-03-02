import { memo } from "react";
import { DayColumn } from "@/components/DayColumn/DayColumn";
import type { KeyCrmOrder } from "@/entities/orders/models";
import {
  getDateFromToday,
  getDayNameFromToday,
  isTodayByDaysOffset,
} from "@/utils/date";

import "./ExtendedFutureSection.css";

export type ExtendedFutureDaysData = {
  [key: number]: KeyCrmOrder[];
};

interface ExtendedFutureSectionProps {
  futureDays: ExtendedFutureDaysData;
}

export const ExtendedFutureSection = memo(
  ({ futureDays }: ExtendedFutureSectionProps) => {
    return (
      <div className="extended-future-section">
        {Object.entries(futureDays).map(([dayOffset, orders]) => {
          const offset = parseInt(dayOffset);
          const dayName = getDayNameFromToday(offset);
          const dayDate = getDateFromToday(offset);
          const isToday = isTodayByDaysOffset(offset);

          return (
            <DayColumn
              key={dayOffset}
              dayName={dayName}
              dayDate={dayDate}
              orders={orders}
              isToday={isToday}
            />
          );
        })}
      </div>
    );
  },
);

ExtendedFutureSection.displayName = "ExtendedFutureSection";
