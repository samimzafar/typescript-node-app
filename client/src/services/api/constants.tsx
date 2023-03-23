export interface IProductListings {
  name: string;
  images: string[];
  category: number;
  productId: number;
  keyFeatures: string;
  description: string;
  unitId: number;
  minOrderQty: number;
  salePrice: number;
  unitPrice: number;
  packSize: number;
  packSizeUnitId: number;
  leadTime: number;
  readyToShip: string;
  availability: string;
  isDraft: boolean;
}

export interface IInquiry {
  quantity: string;
  variety: string | null;
  logisticalOption: string;
  portOfLanding: string;
  weekOfDelivery: string;
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

export interface ICompanyDocumentsPostData {
  registrationCertificateUrl: string | null;
  businessCardUrl: string | null;
  portfolioUrl: string | null;
}
