import { applyMiddleware, compose, createStore, Store, StoreEnhancer } from "redux";
import { createLogger } from "redux-logger";

import { Action } from "./actions";
import { localStorageEnchancer } from "./localstorage-enchancer";
import { IAppState, initialState, rootReducer } from "./reducers";

export { IAppState, IAppStoreDispatcher } from "./reducers";

let enchancer: StoreEnhancer<IAppState>;

if (process.env.NODE_ENV === "development") {
  const devEnchansers = [
    applyMiddleware((<any>createLogger)())
  ];
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enchancer = composeEnhancers(
    ...devEnchansers,
    ...localStorageEnchancer
  ) as any;
} else {
  enchancer = compose(
    ...localStorageEnchancer
  ) as any;
}

export const store: Store<IAppState> = createStore<IAppState, Action<any>, {}, {}>(
  rootReducer,
  initialState,
  enchancer
);