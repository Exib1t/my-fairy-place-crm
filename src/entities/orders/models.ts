export interface KeyCrmOrder {
  id: number;
  status: string;
  tracking_code: string | null;
  shipping_date: string | null;
  child_name: string | null;
  product_image: string | null;
}
