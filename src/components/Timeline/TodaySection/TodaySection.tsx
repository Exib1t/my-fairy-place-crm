import { memo } from "react";
import { OrderCard } from "@/components/OrderCard/OrderCard";
import type { KeyCrmOrder } from "@/entities/orders/models";
import { useWeather } from "@/hooks/useWeather";

import "./TodaySection.css";

interface TodaySectionProps {
  orders: KeyCrmOrder[];
}

export const TodaySection = memo(({ orders }: TodaySectionProps) => {
  const today = new Date().toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const weather = useWeather();

  return (
    <div className="today-section">
      {/* Section Header */}
      <div className="today-section-header">
        <h2 className="today-section-title">{today}</h2>
        {weather && (
          <div className="today-section-weather">
            <span className="today-section-weather-emoji">{weather.emoji}</span>
            <span className="today-section-weather-temp">
              {weather.temperature > 0 ? "+" : ""}{weather.temperature}°
            </span>
            <span className="today-section-weather-label">{weather.label} · Сокаль</span>
          </div>
        )}
        <div className="today-section-count">{orders.length}</div>
      </div>

      {/* Grid Container */}
      <div className="today-section-grid">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            variant="medium"
            showDate={false}
          />
        ))}
      </div>
    </div>
  );
});

TodaySection.displayName = "TodaySection";
