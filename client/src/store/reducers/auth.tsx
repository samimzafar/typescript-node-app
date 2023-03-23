import {
  SET_USER_DATA,
  LOGOUT_USER,
  IState,
  IUpdateUser,
  UPDATE_USER_DATA,
} from "../constants";

interface IStore {
  type: string;
  payload: IState;
}

interface IUpdateStore {
  tyoe: string;
  payload: IUpdateUser;
}

const initialState: IState = {
  isAuthenticated: false,
  accessToken: null,
  userId: null,
  name: null,
  email: null,
  phoneNumber: null,
  userName: null,
  companyId: null,
  companyName: null,
  companyType: null,
  companyVerified: null,
  roleId: null,
  role: null,
  city: null,
  country: null,
  address: null,
};

const auth = (state: IState = initialState, { type, payload }: any) => {
  switch (type) {
    case SET_USER_DATA:
      const {
        accessToken,
        userId,
        name,
        phoneNumber,
        email,
        userName,
        country,
        isAuthenticated,
        companyId,
        companyName,
        companyType,
        companyVerified,
        roleId,
        city,
        address,
        role,
      } = payload;
      return {
        ...state,
        accessToken,
        name,
        userId,
        email,
        phoneNumber,
        userName,
        country,
        isAuthenticated,
        companyId,
        companyName,
        companyType,
        companyVerified,
        role,
        roleId,
        address,
        city,
      };
    case UPDATE_USER_DATA:
      const {
        updatedCity,
        updatedName,
        updatedPhoneNumber,
        updatedCountry,
        updatedAddress,
        updatedCompanyName,
      } = payload;
      return {
        ...state,
        name: updatedName,
        city: updatedCity,
        phoneNumber: updatedPhoneNumber,
        country: updatedCountry,
        companyName: updatedCompanyName,
        address: updatedAddress,
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default auth;
