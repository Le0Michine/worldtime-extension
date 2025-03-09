import persistState from "redux-localstorage";
import lodashMerge from "lodash-es/merge.js";
import cloneDeep from "lodash-es/cloneDeep.js";
import moment from "moment";
import { IAppState } from "./reducers/index.js";

function merge(initialState: IAppState, persistedState: IAppState) {
  const mergedState = cloneDeep(initialState);
  if (!persistedState) {
    return initialState;
  }
  if (persistedState.timeLines) {
    mergedState.timeLines.timelines = persistedState.timeLines.timelines.filter(
      (x) => Boolean(moment.tz.zone(x.timeZoneId)),
    );
  }
  if (persistedState.displaySettings) {
    mergedState.displaySettings = lodashMerge(
      mergedState.displaySettings,
      persistedState.displaySettings,
    );
  }
  if (persistedState.theme) {
    mergedState.theme = lodashMerge(mergedState.theme, persistedState.theme);
  }
  return mergedState;
}

export const localStorageEnhancer = [
  persistState("timeLines", { key: "timeLines@0.0.259", merge }),
  persistState("displaySettings", { key: "displaySettings@0.1.265", merge }),
  persistState("theme", { key: "theme@1.2.45", merge }),
];
