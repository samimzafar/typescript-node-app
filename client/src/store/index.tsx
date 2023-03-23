import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

let composeEnhancers = compose;

const persistConfig = {
  key: "root",
  storage,
};
const middlewares = [thunk];
const initialState = {};
const enhancers = [applyMiddleware(...middlewares)];
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(persistedReducer);
const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(...enhancers)
);

const persistor = persistStore(store);

export { store, persistor };
