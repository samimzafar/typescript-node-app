export const ACTIONS = {
  SET_LOADING: "setIsLoading",
};

export interface CATEGORY {
  id: number;
  name: string;
  url: string | undefined;
}

export interface IProductListing {
  availability: string;
  company: { name: string };
  createdAt: number;
  description: string;
  fk_company_id: number;
  fk_pack_size_unit_id: number;
  fk_product_id: number;
  fk_unit_id: number;
  id: number;
  key_features: string;
  lead_time: number;
  min_order_qty: number;
  name: string;
  packSizeUnit: { name: string };
  pack_size: number;
  product: { name: string; category: { name: string } };
  ready_to_ship: string;
  sale_price: number | null;
  status: string;
  unit: { name: string };
  productListingMedia: { url: string }[];
  unit_price: number;
  updatedAt: number;
}
