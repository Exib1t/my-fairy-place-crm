import { useQuery } from "@tanstack/react-query";
import type { KeyCrmOrder } from "@/entities/orders/models";
import OrdersApi from "@/services/api/orders.api";

export function useOrders() {
  return useQuery<KeyCrmOrder[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await OrdersApi.getAll();

      return response.data;
    },
    refetchInterval: 10000,
  });
}
