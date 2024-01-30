import createTransform from "redux-persist/es/createTransform";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./combineReducers";
import { createStore } from "redux";
import JSOG from "jsog";

export const JSOGTransform = createTransform(
  (inboundState, key) => JSOG.encode(inboundState),
  (outboundState, key) => JSOG.decode(outboundState)
);

const persistConfig = {
  key: "root",
  storage,
  transforms: [JSOGTransform],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export let store = createStore(persistedReducer);

export let persistor = persistStore(store);
