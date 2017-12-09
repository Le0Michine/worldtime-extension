import { createStore, applyMiddleware, combineReducers, compose, Store, Reducer, ReducersMapObject, StoreEnhancer } from "redux";
import { createLogger } from "redux-logger";
import * as persistState from "redux-localstorage";
import * as moment from "moment";

import { timeLines, editTimeLineForm, displaySettings, selectedTimeSpan, theme } from "./reducers";
import { TimeZoneInfo, createTimeZoneInfo, DisplaySettingsInfo, TimeSpanInfo, AppTheme } from "../app.common/models";
import { initialPalette } from "./themes/themes";


export interface IAppState {
  timeLines: TimeZoneInfo[];
  editTimeLineForm: TimeZoneInfo;
  displaySettings: DisplaySettingsInfo;
  selectedTimeSpan: TimeSpanInfo;
  theme: AppTheme;
}

export interface IAppStoreDispatcher extends ReducersMapObject {
  timeLines: Reducer<TimeZoneInfo[]>;
  editTimeLineForm: Reducer<TimeZoneInfo>;
  displaySettings: Reducer<DisplaySettingsInfo>;
  selectedTimeSpan: Reducer<TimeSpanInfo>;
}

const initialState: IAppState = {
  timeLines: [
    createTimeZoneInfo("Europe/Warsaw", "Kraków"),
    createTimeZoneInfo("US/Pacific", "San Francisco"),
    createTimeZoneInfo("Europe/Moscow", "Saint Petersburg"),
    createTimeZoneInfo("Australia/Melbourne", "Melbourne"),
    createTimeZoneInfo("Asia/Calcutta", "India")
    // createTimeZoneInfo("Asia/Yekaterinburg", "Yekaterinburg")
  ],
  editTimeLineForm: { name: "", timeZoneId: "" } as TimeZoneInfo,
  displaySettings: {
    showDST: "hide",
    showTimeZoneId: false,
    showUTCOffset: true,
    showControlPanel: true,
    useDarkTheme: false,
    use24HoursTime: true,
  },
  selectedTimeSpan: {
    startHour: moment().hours(),
    startMinute: moment().minutes(),
    endHour: 24,
    endMinute: 0
  },
  theme: {
    palette: initialPalette,
  }
} as IAppState;

const reducers: IAppStoreDispatcher = {
  timeLines,
  editTimeLineForm,
  displaySettings,
  selectedTimeSpan,
  theme,
};

let enchancer: StoreEnhancer<IAppState>;

const localStorageState = [
  persistState("timeLines", { key: "timeLines@0.0.259" }),
  persistState("displaySettings", { key: "displaySettings@0.1.265" }),
  persistState("theme", { key: "theme@1.2.45" }),
];
if (process.env.NODE_ENV === "development") {
  const devEnchansers = [
    applyMiddleware((<any>createLogger)())
  ];
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enchancer = composeEnhancers(
    ...devEnchansers,
    ...localStorageState
  ) as any;
} else {
  enchancer = compose(
    ...localStorageState
  ) as any;
}

export const store: Store<IAppState> = createStore<IAppState>(
  combineReducers<IAppState>(reducers),
  initialState,
  enchancer
);