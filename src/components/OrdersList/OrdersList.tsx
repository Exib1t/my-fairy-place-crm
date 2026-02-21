"use client";

import Image from "next/image";
import { useOrders } from "@/entities/orders/queries";
import novaPost from "../../assets/images/nova-post.png";

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
    <main className="mx-auto px-8 py-8">
      {isLoading && (
        <div className="flex items-center justify-center py-32">
          <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="text-center py-32">
          <p className="text-red-500 text-4xl font-bold">ERROR</p>
        </div>
      )}

      {data && data.length > 0 && (
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {data.map((order, index) => {
            const overdue = isOverdue(order.shipping_date);

            return (
              <div
                key={order.id}
                className={`
                  relative rounded-2xl p-8 border-2 transition-all duration-300
                  ${
                    overdue
                      ? "bg-red-950/30 border-red-800/50"
                      : "bg-gray-900/40 border-gray-800 hover:border-gray-700"
                  }
                `}
                style={{
                  animation: `fadeIn 0.3s ease-out ${index * 0.03}s both`,
                }}
              >
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
            );
          })}
        </div>
      )}
    </main>
  );
};
export default OrdersList;
