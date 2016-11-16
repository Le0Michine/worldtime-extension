import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { reducer as formReducer } from 'redux-form'
import { timeLines, newTimeLine } from "./reducers";
import { TimeZoneInfo } from "../app.common/models";

const middleware = applyMiddleware(logger());
const initialState = {
  timeLines: [
    new TimeZoneInfo("Krakow", "CET", 1 * 60),
    new TimeZoneInfo("San Francisco", "PST", -8 * 60),
    new TimeZoneInfo("Saint Petersburg", "MSK", 3 * 60),
    new TimeZoneInfo("Yekaterinburg", "GMT+5", 5 * 60)
  ],
  newTimeLine: {}
};

const reducers = {
  timeLines,
  newTimeLine,
  form: formReducer
};

export const store = createStore(combineReducers(reducers), initialState, middleware);