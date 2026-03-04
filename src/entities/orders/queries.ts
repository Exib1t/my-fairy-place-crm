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

export function useTimeline() {
  return useQuery<KeyCrmOrder[]>({
    queryKey: ["timeline"],
    queryFn: async () => {
      const response = await OrdersApi.getTimeline();

      return response.data;
    },
    refetchInterval: 10000,
  });
}

export function useExtendedTimeline() {
  return useQuery<KeyCrmOrder[]>({
    queryKey: ["extended-timeline"],
    queryFn: async () => {
      const response = await OrdersApi.getExtendedTimeline();

      return response.data;
    },
    refetchInterval: 10000,
  });
}

export function useOrder(order_id: number) {
  return useQuery<KeyCrmOrder>({
    queryKey: ["order", order_id],
    queryFn: async () => {
      const response = await OrdersApi.getOne(order_id);

      return response.data;
    },
    enabled: !!order_id,
  });
}
