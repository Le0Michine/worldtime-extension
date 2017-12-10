import * as moment from "moment";
import { applyMiddleware, compose, createStore, Store, StoreEnhancer } from "redux";
import { createLogger } from "redux-logger";

import {
  AppTheme,
  createTimeZoneInfo,
  DisplaySettingsInfo,
  ScrollPosition,
  TimeSpanInfo,
  TimeZoneInfo,
} from "../app.common/models";
import { localStorageEnchancer } from "./localstorage-enchancer";
import { rootReducer, initialState, IAppState } from "./reducers";
import { initialPalette } from "./themes/themes";

export { IAppState, IAppStoreDispatcher } from "./reducers";

let enchancer: StoreEnhancer<IAppState>;

if (process.env.NODE_ENV === "development") {
  const devEnchansers = [
    applyMiddleware((<any>createLogger)())
  ];
  const composeEnhancers = compose;
  // const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enchancer = composeEnhancers(
    ...devEnchansers,
    ...localStorageEnchancer
  ) as any;
} else {
  enchancer = compose(
    ...localStorageEnchancer
  ) as any;
}

export const store: Store<IAppState> = createStore<IAppState>(
  rootReducer,
  initialState,
  enchancer
);