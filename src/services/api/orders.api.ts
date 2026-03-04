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

  getExtendedTimeline() {
    return this._get<KeyCrmOrder[]>("extended-timeline");
  }

  getOne(order_id: number) {
    return this._get<KeyCrmOrder>(`${order_id}`);
  }

  changeStatus(bodyParams: ChangeStatusDto) {
    return this._post<KeyCrmOrder, ChangeStatusDto>(
      "change-status",
      bodyParams,
    );
  }
}

export default new OrdersApi();
