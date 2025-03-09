import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DisplaySettingsInfo, DSTSetting } from "../models";
import { BuildTargets, getBuildTarget } from "../util/target";

export type DisplaySettingsState = DisplaySettingsInfo;

export const initialState: DisplaySettingsState = {
  showDST: "hide",
  showTimeZoneId: false,
  showTimeZoneAbbreviation: true,
  showUTCOffset: true,
  showControlPanel: getBuildTarget() === BuildTargets.demo ? false : true,
  useDarkTheme: false,
  use24HoursTime: true,
  selectionStep: 30,
  showDateLabels: true,
};

export const displaySettingsSlice = createSlice({
  name: "displaySettingsSlice",
  initialState,
  reducers: {
    setShowDst: (state, action: PayloadAction<DSTSetting>) => {
      state.showDST = action.payload;
    },
    setShowUtcOffset: (state, action: PayloadAction<boolean>) => {
      state.showUTCOffset = action.payload;
    },
    setShowTzId: (state, action: PayloadAction<boolean>) => {
      state.showTimeZoneId = action.payload;
    },
    setShowTzShortName: (state, action: PayloadAction<boolean>) => {
      state.showTimeZoneAbbreviation = action.payload;
    },
    setShowControlPanel: (state, action: PayloadAction<boolean>) => {
      state.showControlPanel = action.payload;
    },
    setDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.useDarkTheme = action.payload;
    },
    set24HoursFormat: (state, action: PayloadAction<boolean>) => {
      state.use24HoursTime = action.payload;
    },
    setSelectionStep: (state, action: PayloadAction<number>) => {
      state.selectionStep = action.payload;
    },
    setShowDateLabels: (state, action: PayloadAction<boolean>) => {
      state.showDateLabels = action.payload;
    },
  },
});

export const {
  set24HoursFormat,
  setDarkTheme,
  setSelectionStep,
  setShowControlPanel,
  setShowDateLabels,
  setShowDst,
  setShowTzId,
  setShowTzShortName,
  setShowUtcOffset,
} = displaySettingsSlice.actions;

export default displaySettingsSlice.reducer;
