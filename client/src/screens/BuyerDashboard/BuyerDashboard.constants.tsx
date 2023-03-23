export const ACTIONS = {
  SET_LOADING: "setIsLoading",
  UPDATE_USER: "updateuser",
};

export interface IProduct {
  company: {
    name: string;
    user: {
      country: string;
    };
  };
  id: number;
  key_features: string;
  min_order_qty: number;
  name: string;
  productListingMedia: {
    url: string;
  }[];
  unit_price: number;
  unit: {
    name: string;
  };
}

export interface IInquiries {
  createdAt: number;
  updatedAt: number;
  id: number;
  fk_product_listing_id: number;
  fk_inquiry_by: number;
  fk_company_id: number;
  logistical_option: string;
  port_of_landing: string;
  productListing: {
    name: string;
    unit: {
      name: string;
    };
  };
  quantity: string;
  variety: string | null;
  week_of_delivery: number;
  status: string;
  additional_requirements: string;
}

export interface ICompanyInfo {
  companyType: {
    id: number;
    name: string;
    registered_as: String;
  };
  registration_number: string;
  createdAt: number;
  fk_company_type_id: number;
  fk_user_id: number;
  id: number;
  name: string;
  supplied_products: string | null;
  updatedAt: number;
  verified: boolean;
  isProfileCompleted: boolean;
  user: {
    id: number;
    city: string | null;
    country: string;
    email: string;
    name: string;
    phone_number: string;
  };
  address: string | null;
}

export interface ICompanyDetails {
  phone: string;
  companyType: string;
  companyRegistrationNumber: string;
}

export interface IProductListing {
  availability: string;
  company: {
    name: string;
    user: {
      country: string;
    };
  };
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
  pack_info: string;
  product: { name: string; category: { name: string } };
  ready_to_ship: string;
  sale_price: number | null;
  status: string;
  unit: { name: string };
  productListingMedia: { url: string }[];
  unit_price: number;
  updatedAt: number;
  additional_info: string;
}

export interface IPostInquiry {
  quantity: string;
  variety: string | null;
  logisticalOption: string;
  portOfLanding: string;
  weekOfDelivery: string;
  additionalRequirements?: string;
}

export interface ICompanyPostData {
  name: string | null;
  phoneNumber: string | null;
  companyTypeId: number | null;
  registrationNumber: string | null;
  country: string | null;
  city: string | null;
  companyName: string | null;
  address: string | null;
}

export const BUYER_DOC_TYPES = {
  registrationCertificateUrl: "registrationCertificateUrl",
  businessCardUrl: "businessCardUrl",
  portfolioUrl: "portfolioUrl",
};

export interface ICompanyInfoData {
  company: {
    companyType: {
      id: number;
      name: string;
    };
    id: number;
    name: string;
    registration_number: string | null;
    supplied_products: string | null;
    address: string;
    portfolio_url: string | null;
    registration_certificate_url: string | null;
    business_card_url: string | null;
  };
  user: {
    name: string;
    country: string;
    city: string | null;
    email: string;
    phone_number: string | null;
    username: string;
  };
}
