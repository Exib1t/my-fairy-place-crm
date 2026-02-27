import type { ChangeStatusDto, KeyCrmOrder } from "@/entities/orders/models";
import { BaseApi } from "@/services/api/api";

class OrdersApi extends BaseApi {
  constructor() {
    super("key-crm/orders");
  }

  getAll() {
    return this._get<KeyCrmOrder[]>("");
  }

  getTimeline() {
    return this._get<KeyCrmOrder[]>("timeline");
  }

  changeStatus(bodyParams: ChangeStatusDto) {
    return this._post<KeyCrmOrder, ChangeStatusDto>(
      "change-status",
      bodyParams,
    );
  }
}

export default new OrdersApi();
