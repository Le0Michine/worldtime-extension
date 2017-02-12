import { createStore, applyMiddleware, combineReducers, compose, Action, Reducer } from "redux";
import * as createLogger from "redux-logger";
import * as persistState from "redux-localstorage";

import { timeLines, editTimeLineForm } from "./reducers";
import { TimeZoneInfo, createTimeZoneInfo } from "../app.common/models";


export interface AppState {
  timeLines: TimeZoneInfo[];
  editTimeLineForm: TimeZoneInfo;
}

export interface AppStoreDispatcher {
  timeLines: Reducer<TimeZoneInfo>;
  editTimeLineForm: Reducer<TimeZoneInfo>;
}

const middleware = applyMiddleware(createLogger());
const initialState = {
  timeLines: [
    createTimeZoneInfo("Europe/Warsaw", "Kraków"),
    createTimeZoneInfo("US/Pacific", "San Francisco"),
    createTimeZoneInfo("Europe/Moscow", "Saint Petersburg"),
    createTimeZoneInfo("Asia/Yekaterinburg", "Yekaterinburg")
  ],
  editTimeLineForm: { name: "", timeZoneId: "" } as TimeZoneInfo
};

const reducers = {
  timeLines,
  editTimeLineForm
};

const enchancer = compose(
  middleware,
  persistState("timeLines", { key: "timeLines@0.0.259" }),
) as any;

export const store = createStore<AppState>(combineReducers<AppState>(reducers), initialState, enchancer);