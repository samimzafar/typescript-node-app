import { combineReducers } from "redux";

import { SET_LOADING } from "./constants";
import authReducer from "./reducers/auth";
import productReducer from "./reducers/product";

const setIsLoading = (
  state = false,
  action: { type: string; payload: boolean }
) => {
  if (action.type === SET_LOADING) {
    return action.payload;
  }
  return state;
};

const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  isLoading: setIsLoading,
});

export default rootReducer;
