import axios from "axios";
import {
  IProductListings,
  IInquiry,
  ICompanyPostData,
  ICompanyDocumentsPostData,
} from "./constants";

export const testApi = () => {
  return axios.get(`/api/test`);
};

export const getUser = () => {
  return axios.get(`/api/users/`);
};

export const signUpReq = (body: object) => {
  return axios.post(`/api/users/signup`, body);
};

export const getRolesReq = () => {
  return axios.get("/api/roles/users");
};

export const getCompanyTypesReq = () => {
  return axios.get("/api/companyTypes");
};

export const resendOTPReq = (username: string) => {
  return axios.get(`/api/users/resendCode?username=${username}`);
};

export const verifyOTPReq = (body: object) => {
  return axios.post(`/api/users/verify`, body);
};

export const loginReq = (body: object) => {
  return axios.post(`/api/users/signIn`, body);
};

export const getProductListingsReq = (
  accessToken: string,
  userId: number,
  companyId: number,
  pageNumber: number,
  pageLimit: number
) => {
  return axios.get(
    `/api/users/${userId}/companies/${companyId}/productListings?pageLimit=${pageLimit}&pageNumber=${pageNumber}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const getCategoriesReq = () => {
  return axios.get(`/api/categories`);
};

export const getProductsReq = (categoryId?: number) => {
  return axios.get(`/api/products?categoryId=${categoryId}`);
};

export const getProductAvailabilityAndShipmentReq = (
  accessToken: string,
  adminId: number,
  companyId: number
) => {
  return axios.get(
    `/api/admins/${adminId}/companies/${companyId}/productListings/readyToShipAndAvailability`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const getUnitsReq = () => {
  return axios.get(`/api/units`);
};

export const addProductListingReq = (
  accessToken: string,
  userId: number,
  companyId: number,
  body: IProductListings
) => {
  return axios.post(
    `/api/users/${userId}/companies/${companyId}/productListings`,
    body,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const getProductListingByIdReq = (productId: string | undefined) => {
  return axios.get(`/api/productListings/${productId}`);
};

export const getProductListingForSellerReq = (
  accessToken: string,
  userId: number,
  companyId: number,
  productId?: string
) => {
  return axios.get(
    `/api/users/${userId}/companies/${companyId}/productListings/${productId}/view`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const getAllProductsReq = (userId: number, accessToken: string) => {
  return axios.get(`/api/users/${userId}/productListings/latest`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const getProductDetailsReq = (
  userId: number,
  accessToken: string,
  productListingId: string | undefined
) => {
  return axios.get(`/api/users/${userId}/productListings/${productListingId}`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const getCompanies = ({
  adminId,
  accessToken,
  pageNumber,
  pageLimit,
}: {
  adminId: number;
  accessToken: string;
  pageNumber: number;
  pageLimit: number;
}) => {
  return axios.get(
    `/api/admins/${adminId}/companies?pageLimit=${pageLimit}&pageNumber=${pageNumber}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const getCompanyProductListings = ({
  adminId,
  companyId,
  accessToken,
  pageLimit,
  pageNumber,
}: {
  adminId: number;
  companyId: number;
  accessToken: string;
  pageLimit: number;
  pageNumber: number;
}) => {
  return axios.get(
    `/api/admins/${adminId}/companies/${companyId}/productListings?pageLimit=${pageLimit}&pageNumber=${pageNumber}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const getLogisticalOptionsReq = (
  userId: number,
  accessToken: string
) => {
  return axios.get(`/api/users/${userId}/inquiry/logisticalOptions`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const getInquiriesReq = (
  userId: number,
  accessToken: string,
  pageLimit: number,
  pageNumber: number
) => {
  return axios.get(
    `/api/users/${userId}/inquiry?pageLimit=${pageLimit}&pageNumber=${pageNumber}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const addProductListingByAdminReq = ({
  adminId,
  companyId,
  accessToken,
  body,
}: {
  adminId: number;
  companyId: number;
  accessToken: string;
  body: any;
}) => {
  return axios.post(
    `/api/admins/${adminId}/companies/${companyId}/productListings`,
    body,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const getCompaniesInfoReq = (
  userId: number,
  accessToken: string,
  pageLimit: number,
  pageNumber: number,
  pageRows?: string
) => {
  return axios.get(
    `/api/users/${userId}/companies?pageLimit=${pageLimit}&pageNumber=${pageNumber}&pageRows=${pageRows}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const submitInquiryReq = (
  userId: number,
  accessToken: string,
  companyId: number | null,
  productListingId: string | undefined,
  body: IInquiry
) => {
  return axios.post(
    `/api/users/${userId}/companies/${companyId}/productListings/${productListingId}/inquiry`,
    body,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const getInquiriesByAdminReq = (
  adminId: number,
  accessToken: string,
  pageLimit: number,
  pageNumber: number
) => {
  return axios.get(
    `/api/admins/${adminId}/inquiry?pageLimit=${pageLimit}&pageNumber=${pageNumber}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const changeProductListingStatusReq = ({
  adminId,
  companyId,
  accessToken,
  productListingId,
  status,
}: {
  adminId: number;
  companyId: number;
  accessToken: string;
  productListingId: number;
  status: string;
}) => {
  return axios.post(
    `/api/admins/${adminId}/companies/${companyId}/productListings/${productListingId}/changeStatus?status=${status}`,
    {},
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const changeInquiryStatusReq = ({
  adminId,
  inquiryId,
  status,
  accessToken,
}: {
  adminId: number;
  inquiryId: number;
  accessToken: string;
  status: string;
}) => {
  return axios.put(
    `/api/admins/${adminId}/inquiry/${inquiryId}?status=${status}`,
    {},
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const completeProfileReq = (
  userId: number | string | undefined,
  companyId: number | string | undefined | null,
  accessToken: string,
  body:
    | ICompanyPostData
    | {
        phoneNumber: string;
        companyTypeId: number;
        registrationNumber: string | null;
      }
) => {
  return axios.put(
    `/api/users/${userId}/companies/${companyId}/completeProfile`,
    body,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const getCompanyInfoReq = (
  userId: string | undefined,
  companyId: string | undefined,
  accessToken: string
) => {
  return axios.get(`/api/users/${userId}/companies/${companyId}`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const forgotPasswordReq = (body: { email: string }) => {
  return axios.post(`/api/users/forgotPassword`, body);
};

export const confirmPasswordReq = (body: {
  email: string;
  code: string;
  password: string;
}) => {
  return axios.post(`/api/users/confirmPassword`, body);
};

export const changeVerificationOfCompanyReq = ({
  adminId,
  companyId,
  accessToken,
  verified,
}: {
  adminId: number;
  companyId: number;
  accessToken: string;
  verified: number;
}) => {
  return axios.put(
    `/api/admins/${adminId}/companies/${companyId}/verification?verified=${verified}`,
    {},
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const getInquiryDetailsReq = ({
  adminId,
  inquiryId,
  accessToken,
}: {
  adminId: number;
  inquiryId: number;
  accessToken: string;
}) => {
  return axios.get(`/api/admins/${adminId}/inquiry/${inquiryId}`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const uploadCompanyDocumentsReq = ({
  userId,
  companyId,
  accessToken,
  docType,
  body,
}: {
  userId: string | undefined;
  companyId: string | undefined;
  accessToken: string;
  body: ICompanyDocumentsPostData;
  docType: string;
}) => {
  return axios.put(
    `/api/users/${userId}/companies/${companyId}/saveDocuments?docType=${docType}`,
    body,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const adminUploadCompanyDocumentsReq = ({
  adminId,
  companyId,
  accessToken,
  docType,
  body,
}: {
  adminId: string | undefined;
  companyId: string | undefined;
  accessToken: string;
  body: ICompanyDocumentsPostData;
  docType: string;
}) => {
  return axios.put(
    `/api/admins/${adminId}/companies/${companyId}/saveDocuments?docType=${docType}`,
    body,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};
