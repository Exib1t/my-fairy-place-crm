"use client";

import Image from "next/image";
import { useOrders } from "@/entities/orders/queries";
import novaPost from "../../assets/images/nova-post.png";
import styles from "./OrdersList.module.css";

const OrdersList = () => {
  const { data, isLoading, error } = useOrders();

  const isOverdue = (shippingDate: string | null) => {
    if (!shippingDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const shipping = new Date(shippingDate);
    shipping.setHours(0, 0, 0, 0);
    return shipping < today;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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
        <div className={styles.ordersGrid}>
          {data.map((order, index) => {
            const overdue = isOverdue(order.shipping_date);

            return (
              <div
                key={order.id}
                className={`${styles.orderCard} ${overdue ? styles.orderCardOverdue : ""}`}
                style={{
                  animation: `fadeIn 0.3s ease-out ${index * 0.03}s both`,
                }}
              >
                {/*<div style={{ backdropFilter: "blur(10px)" }}>*/}
                {/*  <img src={order.product_image} alt="" />*/}
                {/*</div>*/}

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
                  <div className="text-center mb-6">
                    <div className="text-8xl font-black font-mono tracking-tighter">
                      {order.id}
                    </div>
                  </div>

                  {/* Child name */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-black font-mono tracking-tighter">
                      {order.child_name}
                    </div>
                  </div>

                  {/* Shipping Date */}
                  {order.shipping_date && (
                    <div className="text-center mb-4">
                      <div
                        className={`text-3xl font-mono font-bold ${overdue ? "text-red-400" : "text-gray-300"}`}
                      >
                        {formatDate(order.shipping_date)}
                      </div>
                    </div>
                  )}

                  {/* Tracking Number */}
                  {order.tracking_code && (
                    <div className="text-center">
                      <div className="flex gap-4 justify-center items-center text-gray-500 text-sm uppercase tracking-wider mb-1">
                        <Image src={novaPost} alt={"Nova post"} width={30} />
                      </div>
                      <div className="text-2xl font-mono font-bold text-gray-400">
                        ТТН {order.tracking_code}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
export default OrdersList;
