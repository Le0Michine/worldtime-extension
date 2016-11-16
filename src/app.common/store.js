import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import logger from "redux-logger";
import { reducer as formReducer } from "redux-form";
import persistState from "redux-localstorage";

import { timeLines, newTimeLine } from "./reducers";
import { TimeZoneInfo, createTimeZoneInfo } from "../app.common/models";


const middleware = applyMiddleware(logger());
const initialState = {
  timeLines: [
    createTimeZoneInfo("Krakow", "CET", 1 * 60),
    createTimeZoneInfo("San Francisco", "PST", -8 * 60),
    createTimeZoneInfo("Saint Petersburg", "MSK", 3 * 60),
    createTimeZoneInfo("Yekaterinburg", "GMT+5", 5 * 60)
  ],
  selectedTimeLineId: null
};

const reducers = {
  timeLines,
  selectedTimeLineId: newTimeLine,
  form: formReducer
};

const enhancer = compose(
  middleware,
  persistState("timeLines", { key: "timeLines" }),
);

export const store = createStore(combineReducers(reducers), initialState, enhancer);