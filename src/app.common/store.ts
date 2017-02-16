import { createStore, applyMiddleware, combineReducers, compose, Action, Reducer } from "redux";
import * as createLogger from "redux-logger";
import * as persistState from "redux-localstorage";

import { timeLines, editTimeLineForm, displaySettings, selectedTimeSpan } from "./reducers";
import { TimeZoneInfo, createTimeZoneInfo, DisplaySettingsInfo, TimeSpanInfo } from "../app.common/models";


export interface AppState {
  timeLines: TimeZoneInfo[];
  editTimeLineForm: TimeZoneInfo;
  displaySettings: DisplaySettingsInfo;
  selectedTimeSpan: TimeSpanInfo;
}

export interface AppStoreDispatcher {
  timeLines: Reducer<TimeZoneInfo>;
  editTimeLineForm: Reducer<TimeZoneInfo>;
  displaySettings: Reducer<TimeZoneInfo>;
  selectedTimeSpan: Reducer<TimeZoneInfo>;
}

const middleware = applyMiddleware(createLogger());
const initialState = {
  timeLines: [
    createTimeZoneInfo("Europe/Warsaw", "Kraków"),
    createTimeZoneInfo("US/Pacific", "San Francisco"),
    createTimeZoneInfo("Europe/Moscow", "Saint Petersburg"),
    createTimeZoneInfo("Australia/Melbourne", "Melbourne"),
    // createTimeZoneInfo("Asia/Yekaterinburg", "Yekaterinburg")
  ],
  editTimeLineForm: { name: "", timeZoneId: "" } as TimeZoneInfo,
  displaySettings: { showDST: "hide", showTimeZoneId: false, showUTCOffset: true, showControlPanel: true },
  selectedTimeSpan: { startHour: 0, startMinute: 0, endHour: 24, endMinute: 0 }
} as AppState;

const reducers = {
  timeLines,
  editTimeLineForm,
  displaySettings,
  selectedTimeSpan
};

let enchancer;

if (process.env.NODE_ENV === "development") {
  enchancer = compose(
    middleware,
    persistState("timeLines", { key: "timeLines@0.0.259" }),
    persistState("displaySettings", { key: "displaySettings@0.1.265" })
  ) as any;
} else {
  enchancer = compose(
    persistState("timeLines", { key: "timeLines@0.0.259" }),
    persistState("displaySettings", { key: "displaySettings@0.1.288" })
  ) as any;
}

export const store = createStore<AppState>(combineReducers<AppState>(reducers), initialState, enchancer);