import { ACTIONS } from "./MainLayout.constants";

interface IState {
  isAuthenticated: boolean;
  accessToken: string;
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  userName: string;
  companyId: number;
  companyName: string;
  companyType: string;
  companyVerified: boolean;
  roleId: number;
  role: string;
  country: string;
  city: string | null;
}

export const setLoading = (isLoading: boolean) => ({
  type: ACTIONS.SET_LOADING,
  payload: isLoading,
});

export const setUserData = (userData: IState) => ({
  type: ACTIONS.SET_USER,
  payload: userData,
});

export const logoutUser = () => ({
  type: ACTIONS.LOGOUT_USER,
});
