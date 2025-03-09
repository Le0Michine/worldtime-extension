import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import { localStorageEnhancer } from "./localstorage-enhancer.js";
import { initialState, reducers } from "./reducers/index.js";

export type { IAppState, IAppStoreDispatcher } from "./reducers/index.js";

export const store = configureStore({
  reducer: reducers,
  devTools: import.meta.env.DEV,
  enhancers: (getDefaultEnhancers) => {
    if (import.meta.env.DEV) {
      return getDefaultEnhancers().concat(
        localStorageEnhancer,
        applyMiddleware((<any>createLogger)()),
      ) as any;
    }
    return getDefaultEnhancers().concat(localStorageEnhancer);
  },
  preloadedState: initialState,
});

export type RootState = ReturnType<typeof store.getState>;
