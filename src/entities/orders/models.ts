export interface KeyCrmOrder {
  id: number;
  status: string;
  tracking_code: string | null;
  shipping_date: string | null;
  child_name: string | null;
  product_image: string | null;
  source_name: string;
  products: KeyCrmOrderProduct[];
  custom_fields: {
    name: string;
    value: string;
  }[];
  attachments: string[];
}

export interface KeyCrmOrderProduct {
  id: number;
  name: string;
  comment: string;
  thumbnail: string | null;
  quantity: number;
  properties: {
    name: string;
    value: string;
  }[];
}

export interface ChangeStatusDto {
  order_id: number;
  status_id: number;
}
