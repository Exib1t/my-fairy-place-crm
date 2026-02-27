import { useMutation } from "@tanstack/react-query";
import type { ChangeStatusDto, KeyCrmOrder } from "@/entities/orders/models";
import OrdersApi from "@/services/api/orders.api";

export function useChangeOrderStatus() {
  return useMutation<KeyCrmOrder, unknown, ChangeStatusDto>({
    mutationKey: ["change-order-status"],
    mutationFn: async (bodyParams) => {
      const response = await OrdersApi.changeStatus(bodyParams);

      return response.data;
    },
    onSuccess: async (_data, _variables, _onMutateResult, context) => {
      await context.client.invalidateQueries({
        queryKey: ["orders", "timeline"],
      });
    },
  });
}
