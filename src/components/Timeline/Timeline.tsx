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

  const groupOrdersByDay = (orders: KeyCrmOrder[]) => {
    const days = {
      1: [] as KeyCrmOrder[], // Monday
      2: [] as KeyCrmOrder[], // Tuesday
      3: [] as KeyCrmOrder[], // Wednesday
      4: [] as KeyCrmOrder[], // Thursday
      5: [] as KeyCrmOrder[], // Friday
    };

    orders.forEach((order) => {
      const dayOfWeek = getDayOfWeek(order.shipping_date);
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        days[dayOfWeek as keyof typeof days].push(order);
      }
    });

    return days;
  };

  const getDayDate = (orders: KeyCrmOrder[]) => {
    if (orders.length === 0) return null;
    return formatDate(orders[0].shipping_date);
  };

  const dayNames = ["ПН", "ВТ", "СР", "ЧТ", "ПТ"];

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

      {data && data.length > 0 && (
        <div className={styles.timeline}>
          {Object.entries(groupOrdersByDay(data)).map(
            ([day, orders], index) => {
              const dayDate = getDayDate(orders);

              return (
                <div key={day} className={styles.dayColumn}>
                  <div className={styles.dayHeader}>
                    <div className={styles.dayInfo}>
                      <h2 className={styles.dayName}>
                        {dayNames[parseInt(day) - 1]}
                      </h2>
                      {dayDate && (
                        <div className={styles.dayDate}>{dayDate}</div>
                      )}
                    </div>
                    <div className={styles.orderCount}>{orders.length}</div>
                  </div>

                  <div className={styles.ordersContainer}>
                    {orders.map((order) => {
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
                              <div className={styles.orderIdText}>
                                {order.id}
                              </div>
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
              );
            },
          )}
        </div>
      )}
    </main>
  );
};

export default Timeline;
