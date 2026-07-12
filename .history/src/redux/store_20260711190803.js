import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { authReducer } from "./auth/slice";
import { contactsReducer } from "./contacts/slice";
import filterReducer from "./filters/slice";


const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },

  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },

  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};


export const store = configureStore({

  reducer: {

    auth: persistReducer(
      authPersistConfig,
      authReducer
    ),

    contacts: contactsReducer,

    filters: filterReducer,

  },


  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({

      serializableCheck: {

        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],

      },

    }),

});


export const persistor = persistStore(store);