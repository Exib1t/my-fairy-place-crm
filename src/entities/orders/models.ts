export interface KeyCrmOrder {
  id: number;
  status: string;
  tracking_code: string | null;
  shipping_date: string | null;
  child_name: string | null;
  product_image: string | null;
}

export interface ChangeStatusDto {
  order_id: number;
  status_id: number;
}
