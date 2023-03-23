import { ACTIONS } from "./BuyerDashboard.constants";

interface IState {
  updatedName: string | null;
  updatedCity: string | null;
  updatedPhoneNumber: string | null;
  updatedCompanyName: string | null;
  updatedCompanyType?: string | null;
  updatedCountry: string | null;
  updatedAddress: string | null;
}

export const setLoading = (isLoading: boolean) => ({
  type: ACTIONS.SET_LOADING,
  payload: isLoading,
});

export const updateUserData = (userData: IState) => ({
  type: ACTIONS.UPDATE_USER,
  payload: userData,
});
