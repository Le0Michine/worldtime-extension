import { combineReducers, Reducer, ReducersMapObject } from "redux";

import * as displaySettings from "./DisplaySettingsReducer";
import * as editTimeLineForm from "./EditTimeLineFormReducer";
import * as scrollPosition from "./ScrollPositionReducer";
import * as selectedTimeSpan from "./SelectedTimeSpanReducer";
import * as theme from "./ThemeReducer";
import * as timeLines from "./TimeLineReducer";

export interface IAppStoreDispatcher extends ReducersMapObject {
    timeLines: Reducer<timeLines.State>;
    editTimeLineForm: Reducer<editTimeLineForm.State>;
    displaySettings: Reducer<displaySettings.State>;
    selectedTimeSpan: Reducer<selectedTimeSpan.State>;
    theme: Reducer<theme.State>;
    scrollPosition: Reducer<scrollPosition.State>;
}

export interface IAppState {
    timeLines: timeLines.State;
    editTimeLineForm: editTimeLineForm.State;
    displaySettings: displaySettings.State;
    selectedTimeSpan: selectedTimeSpan.State;
    theme: theme.State;
    scrollPosition: scrollPosition.State;
}

const reducers: IAppStoreDispatcher = {
    timeLines: timeLines.reducer,
    editTimeLineForm: editTimeLineForm.reducer,
    displaySettings: displaySettings.reducer,
    selectedTimeSpan: selectedTimeSpan.reducer,
    theme: theme.reducer,
    scrollPosition: scrollPosition.reducer,
};

export const initialState: IAppState = {
    timeLines: timeLines.initialState,
    editTimeLineForm: editTimeLineForm.initialState,
    displaySettings: displaySettings.initialState,
    selectedTimeSpan: selectedTimeSpan.initialState,
    theme: theme.initialState,
    scrollPosition: scrollPosition.initialState,
};

export const rootReducer = combineReducers<IAppState>(reducers);