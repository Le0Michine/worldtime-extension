import { TimeSpanInfo } from "../models";
import moment from "moment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectedTimespanState = TimeSpanInfo;

export const initialState: SelectedTimespanState = {
  startHour: moment().hours(),
  startMinute: moment().minutes(),
  endHour: 24,
  endMinute: 0,
};

export const selectedTimespanSlice = createSlice({
  name: "selectedTimespanSlice",
  initialState,
  reducers: {
    changeSelectedTimespan: (state, action: PayloadAction<TimeSpanInfo>) => {
      state.startHour = action.payload.startHour;
      state.startMinute = action.payload.startMinute;
      state.endHour = action.payload.endHour;
      state.endMinute = action.payload.endMinute;
    },
    changeStartTime: (
      state,
      action: PayloadAction<{ hour: number; minute: number }>,
    ) => {
      state.startHour = action.payload.hour;
      state.startMinute = action.payload.minute;
    },
    changeStartHour: (state, action: PayloadAction<number>) => {
      state.startHour = action.payload;
    },
    changeStartMinute: (state, action: PayloadAction<number>) => {
      state.startMinute = action.payload;
    },
    changeEndTime: (
      state,
      action: PayloadAction<{ hour: number; minute: number }>,
    ) => {
      state.endHour = action.payload.hour;
      state.endMinute = action.payload.minute;
    },
    changeEndHour: (state, action: PayloadAction<number>) => {
      state.endHour = action.payload;
    },
    changeEndMinute: (state, action: PayloadAction<number>) => {
      state.endMinute = action.payload;
    },
  },
});

export const {
  changeEndHour,
  changeEndMinute,
  changeEndTime,
  changeSelectedTimespan,
  changeStartHour,
  changeStartMinute,
  changeStartTime,
} = selectedTimespanSlice.actions;

export default selectedTimespanSlice.reducer;
