import { Action, Reducer, ReducersMapObject } from "redux";

import displaySettings, {
  initialState as displaySettingsInitialState,
  type DisplaySettingsState,
} from "./DisplaySettingsReducer.js";
import scrollPosition, {
  initialState as scrollPositionInitialState,
  type ScrollPositionState,
} from "./ScrollPositionReducer.js";
import selectedTimeSpan, {
  initialState as selectedTimeSpanInitialState,
  type SelectedTimespanState,
} from "./SelectedTimeSpanReducer.js";
import theme, {
  initialState as themeInitialState,
  type ThemeState,
} from "./ThemeReducer.js";
import timeLines, {
  type TimelinesState,
  initialState as timelinesInitialState,
} from "./TimeLineReducer.js";
import editTimeLineForm, {
  initialState as editTimeLineFormInitialState,
  type EditTimelineState,
} from "./EditTimeLineFormReducer.js";

export interface IAppStoreDispatcher extends ReducersMapObject {
  timeLines: Reducer<TimelinesState, Action<any>>;
  editTimeLineForm: Reducer<EditTimelineState, Action<any>>;
  displaySettings: Reducer<DisplaySettingsState, Action<any>>;
  selectedTimeSpan: Reducer<SelectedTimespanState, Action<any>>;
  theme: Reducer<ThemeState, Action<any>>;
  scrollPosition: Reducer<ScrollPositionState, Action<any>>;
}

export interface IAppState {
  timeLines: TimelinesState;
  editTimeLineForm: EditTimelineState;
  displaySettings: DisplaySettingsState;
  selectedTimeSpan: SelectedTimespanState;
  theme: ThemeState;
  scrollPosition: ScrollPositionState;
}

export const reducers = {
  timeLines: timeLines,
  editTimeLineForm: editTimeLineForm,
  displaySettings,
  selectedTimeSpan: selectedTimeSpan,
  theme: theme,
  scrollPosition: scrollPosition,
};

export const initialState: IAppState = {
  timeLines: timelinesInitialState,
  editTimeLineForm: editTimeLineFormInitialState,
  displaySettings: displaySettingsInitialState,
  selectedTimeSpan: selectedTimeSpanInitialState,
  theme: themeInitialState,
  scrollPosition: scrollPositionInitialState,
};
