import { memo } from "react";
import { DayColumn } from "@/components/DayColumn/DayColumn";
import type { KeyCrmOrder } from "@/entities/orders/models";
import { DAY_NAMES } from "@/utils/constants";
import { getDateForDayOfWeek, isTodayColumn } from "@/utils/date";

import "./FutureSection.css";

export type FutureDaysData = {
  [key: number]: KeyCrmOrder[];
};

interface FutureSectionProps {
  futureDays: FutureDaysData;
}

export const FutureSection = memo(({ futureDays }: FutureSectionProps) => {
  return (
    <div className="future-section">
      {Object.entries(futureDays).map(([day, orders]) => {
        const dayNumber = parseInt(day);
        const dayDate = getDateForDayOfWeek(dayNumber);
        const isToday = isTodayColumn(dayNumber);

        return (
          <DayColumn
            key={day}
            dayName={DAY_NAMES[dayNumber - 1]}
            dayDate={dayDate}
            orders={orders}
            isToday={isToday}
          />
        );
      })}
    </div>
  );
});

FutureSection.displayName = "FutureSection";
