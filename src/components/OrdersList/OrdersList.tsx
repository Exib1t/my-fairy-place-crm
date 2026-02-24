"use client";

import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { OrderCard } from "@/components/OrderCard/OrderCard";
import { useOrders } from "@/entities/orders/queries";

import "./OrdersList.css";

const OrdersList = () => {
  const { data, isLoading, error } = useOrders();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <main className="orders-list-main">
      <div className="orders-list-grid">
        {data.map((order, index) => (
          <OrderCard
            key={order.id}
            order={order}
            index={index}
            variant="large"
          />
        ))}
      </div>
    </main>
  );
};

export default OrdersList;
