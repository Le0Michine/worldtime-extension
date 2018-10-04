import cloneDeep from "lodash-es/cloneDeep";
import merge from "lodash-es/merge";
import * as moment from "moment";
import * as persistState from "redux-localstorage";

import { IAppState } from "./reducers";

function mergeState(initialState: IAppState, persistedState: IAppState) {
    const mergedState = cloneDeep(initialState);
    if (!persistedState) {
        return initialState;
    }
    if (persistedState.timeLines) {
        mergedState.timeLines = persistedState.timeLines.filter(x => Boolean(moment.tz.zone(x.timeZoneId)));
    }
    if (persistedState.displaySettings) {
        mergedState.displaySettings = merge(mergedState.displaySettings, persistedState.displaySettings);
    }
    if (persistedState.theme) {
        mergedState.theme = merge(mergedState.theme, persistedState.theme);
    }
    return mergedState;
}

export const localStorageEnchancer = [
    persistState("timeLines", { key: "timeLines@0.0.259", mergeState }),
    persistState("displaySettings", { key: "displaySettings@0.1.265", mergeState }),
    persistState("theme", { key: "theme@1.2.45", mergeState }),
];