import { ACTIONS } from "./ProductListings.constants";

export const setLoading = (isLoading: boolean) => ({
  type: ACTIONS.SET_LOADING,
  payload: isLoading,
});

interface ISelectValues {
  label: string;
  value: number;
}

interface ISelectValuesString {
  label: string;
  value: string;
}

interface IBasicInfo {
  name: string | null;
  category: ISelectValues | null;
  productType: ISelectValues | null;
  keyFeatures: string | null;
}

interface IDesription {
  description: string;
  images: string[];
}

interface IPricingAndPackaging {
  unit: ISelectValues;
  packSizeUnit: ISelectValues;
  minOrderQuantity: number;
  unitPrice: number;
  salePrice: number | null;
  packSize: number;
  leadTimeinDays: number;
  readyToShip: ISelectValuesString;
  availability: ISelectValuesString;
}

export const addBasicInfo = (data: IBasicInfo) => ({
  type: ACTIONS.ADD_BASIC_INFO,
  payload: data,
});

export const addDescription = (data: IDesription) => ({
  type: ACTIONS.ADD_DESCRIPTION,
  payload: data,
});

export const addPricingAndPackaging = (data: IPricingAndPackaging) => ({
  type: ACTIONS.ADD_PRICING_AND_PACKAGING,
  payload: data,
});

export const deleteProductData = () => ({
  type: ACTIONS.DELETE_PRODUCT_DATA,
});
