import {
  ADD_BASIC_INFO,
  ADD_DESCRIPTION,
  ADD_PRICING_AND_PACKAGING,
  IProduct,
  IBasicInfo,
  IDescription,
  IPricingAndPackaging,
  DELETE_PRODUCT_DATA,
} from "../constants";

const initialState = {
  name: null,
  category: null,
  productType: null,
  keyFeatures: null,
  description: null,
  images: null,
  unit: null,
  packSizeUnit: null,
  minOrderQuantity: null,
  unitPrice: null,
  salePrice: null,
  packSize: null,
  leadTimeinDays: null,
  readyToShip: null,
  availability: null,
};

const product = (
  state: IProduct = initialState,
  { type, payload }: IBasicInfo | IDescription | IPricingAndPackaging | any
) => {
  switch (type) {
    case ADD_BASIC_INFO:
      const { name, keyFeatures, category, productType } = payload;
      return {
        ...state,
        name,
        keyFeatures,
        category,
        productType,
      };
    case ADD_DESCRIPTION:
      const { description, images } = payload;
      return {
        ...state,
        description,
        images,
      };
    case ADD_PRICING_AND_PACKAGING:
      const {
        unit,
        packSizeUnit,
        minOrderQuantity,
        unitPrice,
        salePrice,
        packSize,
        leadTimeinDays,
        readyToShip,
        availability,
      } = payload;
      return {
        ...state,
        unit,
        packSizeUnit,
        minOrderQuantity,
        unitPrice,
        salePrice,
        packSize,
        leadTimeinDays,
        readyToShip,
        availability,
      };
    case DELETE_PRODUCT_DATA:
      return initialState;
    default:
      return state;
  }
};

export default product;
