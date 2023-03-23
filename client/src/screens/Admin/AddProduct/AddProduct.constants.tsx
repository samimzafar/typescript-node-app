export const BASIC_INFO_INPUT_FIELDS_DATA = [
  {
    name: "name",
    type: "text",
    placeHolder: "Enter Name",
    label: "Name",
    rules: {
      required: true,
    },
    onInput: (e: any) => e.target.value.toString().trimStart(),
    errorMessage: "Name is required",
  },
  {
    name: "keyFeatures",
    type: "text",
    placeHolder: "Enter Key Features",
    label: "Available Varieties",
    rules: {
      required: true,
      min: 3,
    },
    onInput: (e: any) => e.target.value.toString().trimStart(),
    errorMessage: "Available Varieties are required",
  },
];

export const PRICING_INPUT_FIELDS = [
  {
    name: "unitPrice",
    type: "number",
    placeHolder: "Enter Unit Price",
    label: "Unit Price (USD)",
    rules: {
      required: true,
    },
    errorMessage: "Unit Price is required",
  },
  {
    name: "salePrice",
    type: "number",
    placeHolder: "Enter Sale Price",
    label: "Sale Price (USD)",
    rules: {
      required: false,
    },
    errorMessage: "Sale Price is required",
  },
  {
    name: "minOrderQty",
    type: "number",
    placeHolder: "Enter Min Order Quantity",
    label: "Minimum Order Quantity",
    rules: {
      required: true,
    },
    errorMessage: "Min Order Quantity is required",
  },
];

export const PACKAGING_INPUT_FIELDS = [
  {
    name: "packSize",
    type: "number",
    placeHolder: "Enter Pack Size",
    label: "Pack Size",
    rules: {
      required: false,
    },
    errorMessage: "Pack Size is required",
  },
  {
    name: "leadTime",
    type: "number",
    placeHolder: "Lead Time (In Days)",
    label: "Lead Time (In Days)",
    rules: {
      required: false,
    },
    errorMessage: "Lead Time is required",
  },
];

export const IMAGE_FORMATS = ["image/png", "image/jpeg", "image/jpg"];
