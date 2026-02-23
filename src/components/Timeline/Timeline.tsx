"use client";

import Image from "next/image";
import { KeyCrmOrder } from "@/entities/orders/models";
import { useTimeline } from "@/entities/orders/queries";
import novaPost from "../../assets/images/nova-post.png";
import styles from "./Timeline.module.css";

const Timeline = () => {
  const { data, isLoading, error } = useTimeline();

  const getDayOfWeek = (dateString: string | null): number => {
    if (!dateString) return -1;
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 0 ? 7 : day; // Convert Sunday (0) to 7
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const isOverdue = (shippingDate: string | null) => {
    if (!shippingDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const shipping = new Date(shippingDate);
    shipping.setHours(0, 0, 0, 0);
    return shipping < today;
  };

  const isToday = (shippingDate: string | null) => {
    if (!shippingDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const shipping = new Date(shippingDate);
    shipping.setHours(0, 0, 0, 0);
    return shipping.getTime() === today.getTime();
  };

  const groupOrdersByCategory = (orders: KeyCrmOrder[]) => {
    const todayAndOverdue: KeyCrmOrder[] = [];
    const futureDays = {
      1: [] as KeyCrmOrder[], // Monday
      2: [] as KeyCrmOrder[], // Tuesday
      3: [] as KeyCrmOrder[], // Wednesday
      4: [] as KeyCrmOrder[], // Thursday
      5: [] as KeyCrmOrder[], // Friday
      6: [] as KeyCrmOrder[], // Saturday
      7: [] as KeyCrmOrder[], // Sunday
    };

    orders.forEach((order) => {
      if (isToday(order.shipping_date) || isOverdue(order.shipping_date)) {
        todayAndOverdue.push(order);
      } else {
        const dayOfWeek = getDayOfWeek(order.shipping_date);
        if (dayOfWeek >= 1 && dayOfWeek <= 7) {
          futureDays[dayOfWeek as keyof typeof futureDays].push(order);
        }
      }
    });

    return { todayAndOverdue, futureDays };
  };

  const getDateForDayOfWeek = (dayOfWeek: number) => {
    const today = new Date();
    const currentDay = today.getDay() === 0 ? 7 : today.getDay(); // Convert Sunday (0) to 7
    const diff = dayOfWeek - currentDay;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);

    return targetDate.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const dayNames = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  return (
    <main className={styles.main}>
      {isLoading && (
        <div className={styles.loader}>
          <div className={styles.spinner} />
        </div>
      )}

      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>ERROR</p>
        </div>
      )}

      {data &&
        data.length > 0 &&
        (() => {
          const { todayAndOverdue, futureDays } = groupOrdersByCategory(data);

          return (
            <div className={styles.timeline}>
              {/* Left side: Today & Overdue orders in grid */}
              <div className={styles.todaySection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>
                    СЬОГОДНI ТА ПРОТЕРМIНОВАНI
                  </h2>
                  <div className={styles.orderCount}>
                    {todayAndOverdue.length}
                  </div>
                </div>
                <div className={styles.gridContainer}>
                  {todayAndOverdue.map((order) => {
                    const overdue = isOverdue(order.shipping_date);

                    return (
                      <div
                        key={order.id}
                        className={`${styles.orderCard} ${overdue ? styles.orderCardOverdue : ""}`}
                      >
                        {/* Background Image */}
                        {order.product_image && (
                          <div
                            className={styles.backgroundImage}
                            style={{
                              backgroundImage: `url(${order.product_image})`,
                            }}
                          />
                        )}

                        <div className={styles.cardContent}>
                          {/* Order ID */}
                          <div className={styles.orderId}>
                            <div className={styles.orderIdText}>{order.id}</div>
                          </div>

                          {/* Child name */}
                          <div className={styles.childName}>
                            <div className={styles.childNameText}>
                              {order.child_name ?? "-"}
                            </div>
                          </div>

                          {/* Tracking Number */}
                          {order.tracking_code && (
                            <div className={styles.trackingContainer}>
                              <div className={styles.trackingHeader}>
                                <Image
                                  src={novaPost}
                                  alt={"Nova post"}
                                  width={20}
                                />
                              </div>
                              <div className={styles.trackingCode}>
                                {order.tracking_code}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.divider} />

              {/* Right side: Future days in columns */}
              <div className={styles.futureSection}>
                {Object.entries(futureDays).map(([day, orders]) => {
                  const dayNumber = parseInt(day);
                  const dayDate = getDateForDayOfWeek(dayNumber);

                  return (
                    <div key={day} className={styles.dayColumn}>
                      <div className={styles.dayHeader}>
                        <div className={styles.dayInfo}>
                          <h2 className={styles.dayName}>
                            {dayNames[dayNumber - 1]}
                          </h2>
                          <div className={styles.dayDate}>{dayDate}</div>
                        </div>
                        <div className={styles.orderCount}>{orders.length}</div>
                      </div>

                      <div className={styles.ordersContainer}>
                        {orders.map((order) => (
                          <div key={order.id} className={styles.compactCard}>
                            <div className={styles.compactOrderId}>
                              {order.id}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
    </main>
  );
};

export default Timeline;
