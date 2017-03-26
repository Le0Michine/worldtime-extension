import { createStore, applyMiddleware, combineReducers, compose, Store, Reducer, ReducersMapObject, StoreEnhancer } from "redux";
import createLogger from "redux-logger";
import * as persistState from "redux-localstorage";
import * as moment from "moment";

import { timeLines, editTimeLineForm, displaySettings, selectedTimeSpan } from "./reducers";
import { TimeZoneInfo, createTimeZoneInfo, DisplaySettingsInfo, TimeSpanInfo } from "../app.common/models";


export interface IAppState {
  timeLines: TimeZoneInfo[];
  editTimeLineForm: TimeZoneInfo;
  displaySettings: DisplaySettingsInfo;
  selectedTimeSpan: TimeSpanInfo;
}

export interface IAppStoreDispatcher extends ReducersMapObject {
  timeLines: Reducer<TimeZoneInfo[]>;
  editTimeLineForm: Reducer<TimeZoneInfo>;
  displaySettings: Reducer<DisplaySettingsInfo>;
  selectedTimeSpan: Reducer<TimeSpanInfo>;
}

// tslint:disable-next-line:typedef
const middleware = applyMiddleware(createLogger());
const initialState: IAppState = {
  timeLines: [
    createTimeZoneInfo("Europe/Warsaw", "Kraków"),
    createTimeZoneInfo("US/Pacific", "San Francisco"),
    createTimeZoneInfo("Europe/Moscow", "Saint Petersburg"),
    createTimeZoneInfo("Australia/Melbourne", "Melbourne"),
    // createTimeZoneInfo("Asia/Yekaterinburg", "Yekaterinburg")
  ],
  editTimeLineForm: { name: "", timeZoneId: "" } as TimeZoneInfo,
  displaySettings: { showDST: "hide", showTimeZoneId: false, showUTCOffset: true, showControlPanel: true },
  selectedTimeSpan: { startHour: moment().hours(), startMinute: moment().minutes(), endHour: 24, endMinute: 0 }
} as IAppState;

const reducers: IAppStoreDispatcher = {
  timeLines,
  editTimeLineForm,
  displaySettings,
  selectedTimeSpan
};

let enchancer: StoreEnhancer<IAppState>;

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

export const store: Store<IAppState> = createStore<IAppState>(combineReducers<IAppState>(reducers), initialState, enchancer);