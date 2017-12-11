import { compose } from "redux";
import * as persistState from "redux-localstorage";
import * as _ from "lodash";
import { IAppState } from "./reducers";

function merge(initialState: IAppState, persistedState: IAppState) {
    const mergedState = _.cloneDeep(initialState);
    if (!persistedState) {
        return initialState;
    }
    if (persistedState.timeLines) {
        mergedState.timeLines = persistedState.timeLines;
    }
    if (persistedState.displaySettings) {
        mergedState.displaySettings = _.merge(mergedState.displaySettings, persistedState.displaySettings);
    }
    if (persistedState.theme) {
        mergedState.theme = _.merge(mergedState.theme, persistedState.theme);
    }
    return mergedState;
}

export const localStorageEnchancer = [
    persistState("timeLines", { key: "timeLines@0.0.259", merge }),
    persistState("displaySettings", { key: "displaySettings@0.1.265", merge }),
    persistState("theme", { key: "theme@1.2.45", merge }),
];