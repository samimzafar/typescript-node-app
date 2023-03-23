import { ACTIONS } from "./Home.contants";

export const setLoading = (isLoading: boolean) => ({
  type: ACTIONS.SET_LOADING,
  payload: isLoading,
});
