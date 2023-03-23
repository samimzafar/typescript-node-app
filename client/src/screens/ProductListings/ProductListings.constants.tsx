import { BiShow } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";

export const ACTIONS = {
  SET_LOADING: "setIsLoading",
  ADD_BASIC_INFO: "addBasicInfo",
  ADD_DESCRIPTION: "addDescription",
  ADD_PRICING_AND_PACKAGING: "addPricingAndPackaging",
  DELETE_PRODUCT_DATA: "deleteProductData",
};

export const columns = (onView: (row: IProductListing) => void) => [
  {
    name: <b>ID</b>,
    selector: (row: any) => row.id,
    cell: (row: any) => row.id,
    width: "80px",
    sortable: true,
  },
  {
    name: <b>Name</b>,
    width: "200px",
    selector: (row: any) => row.name,
  },
  {
    name: <b>Product</b>,
    selector: (row: any) => row.product.name,
  },
  {
    name: <b>Availability</b>,
    cell: (row: any) => (
      <div>
        {row.availability === "In stock" ? (
          <span className="badge pill-badge bg-success">
            {row.availability}
          </span>
        ) : (
          <span className="badge pill-badge bg-warning">
            {row.availability}
          </span>
        )}
      </div>
    ),
  },
  {
    name: <b>Status</b>,
    cell: (row: any) => (
      <div>
        {row.status === "Published" ? (
          <span className="badge pill-badge bg-success">{row.status}</span>
        ) : (
          <span className="badge pill-badge bg-primary">{row.status}</span>
        )}
      </div>
    ),
  },
  {
    name: <b>Ready to Ship</b>,
    selector: (row: any) => row.ready_to_ship,
  },
  {
    name: <b>Actions</b>,
    cell: (row: any) => (
      <div>
        <BiShow
          className="tg-action-icons"
          size={25}
          onClick={() => onView(row)}
        />

        <AiFillEdit className="tg-action-icons" size={25} />
      </div>
    ),
  },
];
export interface IProductListingMedia {
  url: string;
}
export interface IProductListing {
  id: number;
  name: string;
  fk_company_id: number;
  fk_product_id: number;
  key_features: string;
  description: string;
  fk_unit_id: number;
  min_order_qty: number;
  unit_price: number;
  sale_price: number | null;
  pack_size: number;
  fk_pack_size_unit_id: number;
  lead_time: number;
  ready_to_ship: string;
  availability: string;
  status: string;
  createdAt: number;
  updatedAt: number;
  product?: {
    name: string;
    category?: {
      name: string;
    };
  };
  productListingMedia?: IProductListingMedia[] | [];
}

export interface ICategory {
  id: number;
  name: string;
  url: string | null;
}

export interface IUser {
  id: number;
  name: string;
}

export interface IProducts {
  id: number;
  name: string;
  fk_category_id: number;
}

export const customStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "white",
    height: "55px",
  }),
  indicatorSeparator: (state: any) => ({
    display: "none",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "white",
    backgroundColor: "#7FAD38",
    cursor: "pointer",
    height: "53px",
    paddingTop: "15px",
    paddingBottom: "15px",
  }),
};

export const ITEM_FILE_SIZE_LIMIT = {
  lower: 0,
  higher: 5242880,
};

export const IMAGE_FORMATS = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
];

export const BASIC_INFO_FIELD_DATA = [
  {
    name: "name",
    type: "text",
    placeHolder: "Name",
    label: "Name",
    rules: { required: true },
    errorMessage: "Name is Required",
  },
  {
    name: "keyFeatures",
    type: "text",
    placeHolder: "Key Features",
    label: "Key Features",
    rules: { required: true },
    errorMessage: "Key Feautures is Required",
  },
];

export const PRICING_AND_PACKAGING_FIELD_DATA = [
  {
    name: "minOrderQuantity",
    type: "number",
    placeHolder: "Min Qty to Order",
    label: "Min Qty to Order",
    rules: { required: true },
    errorMessage: "Min Qty is Required",
  },
  {
    name: "unitPrice",
    type: "number",
    placeHolder: "Unit price in USD",
    label: "Unit price in USD",
    rules: { required: true },
    errorMessage: "Unit price is Required",
  },
  {
    name: "salePrice",
    type: "number",
    placeHolder: "Sale Price in USD (Optional)",
    label: "Sale Price in USD (Optional)",
    rules: {},
    errorMessage: "Sale Price is Required",
  },
  {
    name: "leadTime",
    type: "number",
    placeHolder: "Lead Time in days",
    label: "Lead Time in days",
    rules: { required: true },
    errorMessage: "Lead Time is Required",
  },
  {
    name: "packSize",
    type: "number",
    placeHolder: "Pack Size",
    label: "Pack Size",
    rules: { required: true },
    errorMessage: "Pack Size is Required",
  },
];

export const selectDropDownOptions = (
  unitsOption: any,
  shipmentOptions: any,
  availabilityOptions: any
) => {
  return [
    {
      name: "packSizeUnit",
      placeHolder: "Pack Size Unit",
      rules: { required: true },
      label: "Pack Size Unit",
      errorMessage: "Pack Size Unit is required",
      options: unitsOption,
    },
    {
      name: "productShipment",
      placeHolder: "Ready for Shipment",
      rules: { required: true },
      label: "Ready for Shipment",
      errorMessage: "This value is required",
      options: shipmentOptions,
    },
    {
      name: "availablility",
      placeHolder: "Available",
      rules: { required: true },
      label: "Ready for Shipment",
      errorMessage: "This value is required",
      options: availabilityOptions,
    },
  ];
};
