import type { KeyCrmOrder } from "@/entities/orders/models";
import { BaseApi } from "@/services/api/api";

class OrdersApi extends BaseApi {
  constructor() {
    super("key-crm/orders");
  }

  getAll() {
    return this._get<KeyCrmOrder[]>("");
  }
}

export default new OrdersApi();
