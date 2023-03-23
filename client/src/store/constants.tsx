export const LOGOUT_USER = "logout";
export const SET_USER_DATA = "setUserData";
export const UPDATE_USER_DATA = "updateuser";
export const SET_LOADING = "setIsLoading";
export const ADD_BASIC_INFO = "addBasicInfo";
export const ADD_DESCRIPTION = "addDescription";
export const ADD_PRICING_AND_PACKAGING = "addPricingAndPackaging";
export const DELETE_PRODUCT_DATA = "deleteProductData";

export interface IState {
  isAuthenticated: boolean;
  accessToken: string | null;
  userId: number | null;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  userName: string | null;
  companyId: number | null;
  companyName: string | null;
  companyType: string | null;
  companyVerified: boolean | null;
  roleId: number | null;
  role: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
}

export interface IUpdateUser {
  name: string | null;
  phoneNumber: string | null;
  companyName: string | null;
  companyType: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
}

interface ISelectValues {
  label: string;
  value: number;
}

export interface IProduct {
  name: string | null;
  category: ISelectValues | null;
  productType: ISelectValues | null;
  keyFeatures: string | null;
  description: string | null;
  images: string[] | null;
  unit: string | null;
  packSizeUnit: string | null;
  minOrderQuantity: number | null;
  unitPrice: number | null;
  salePrice: number | null;
  packSize: number | null;
  leadTimeinDays: number | null;
  readyToShip: string | null;
  availability: string | null;
}

export interface IBasicInfo {
  name: string | null;
  category: string | null;
  productType: string | null;
  keyFeatures: string | null;
}

export interface IDescription {
  description: string;
  images: string[];
}

export interface IPricingAndPackaging {
  unit: number;
  packSizeUnit: number;
  minOrderQuantity: number;
  unitPrice: number;
  salePrice: number | null;
  packSize: number;
  leadTimeinDays: number;
  readyToShip: string;
  availability: string;
}
