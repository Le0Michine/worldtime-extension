import { TimeZoneInfo } from "../models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditTimelineState {
  timezone: TimeZoneInfo;
}

export const initialState: EditTimelineState = {
  timezone: {
    name: "",
    timeZoneId: "",
    timeLineId: -1,
  },
};

export const editTimeLineFormSlice = createSlice({
  name: "editTimeLineFormSlice",
  initialState,
  reducers: {
    changeDisplayName: (state, action: PayloadAction<string>) => {
      state.timezone.name = action.payload;
    },
    changeTzId: (state, action: PayloadAction<string>) => {
      state.timezone.timeZoneId = action.payload;
    },
    init: (state, action: PayloadAction<TimeZoneInfo>) => {
      state.timezone = action.payload;
    },
    clear: (state, action: PayloadAction<TimeZoneInfo>) => {
      state.timezone = {
        name: "",
        timeZoneId: "",
        timeLineId: -1,
      };
    },
  },
});

export const { changeDisplayName, changeTzId, clear, init } =
  editTimeLineFormSlice.actions;

export default editTimeLineFormSlice.reducer;
