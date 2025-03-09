import { TimeZoneInfo, createTimeZoneInfo } from "../models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TimelinesState = {
  timelines: TimeZoneInfo[];
};

export const initialState: TimelinesState = {
  timelines: [
    createTimeZoneInfo("Europe/Warsaw", "Kraków"),
    createTimeZoneInfo("US/Pacific", "San Francisco"),
    createTimeZoneInfo("Europe/Moscow", "Saint Petersburg"),
    createTimeZoneInfo("Australia/Melbourne", "Melbourne"),
    createTimeZoneInfo("Asia/Calcutta", "India"),
    // createTimeZoneInfo("Asia/Yekaterinburg", "Yekaterinburg")
  ],
};

export const timelineSlice = createSlice({
  name: "timelineSlice",
  initialState,
  reducers: {
    deleteTimeline: (state, action: PayloadAction<number>) => {
      const i = state.timelines.findIndex(
        (x) => x.timeLineId === action.payload,
      );
      const timeLines =
        i > -1
          ? state.timelines.slice(0, i).concat(state.timelines.slice(i + 1))
          : state.timelines;
      state.timelines = timeLines;
    },
    createOrUpdateTimeline: (state, action: PayloadAction<TimeZoneInfo>) => {
      if (!action.payload.timeLineId) {
        const newId = state.timelines
          .map((x) => x.timeLineId)
          .reduce((acc, x) => acc + x, 1);
        Object.assign(action.payload, { timeLineId: newId });
      }
      const i = state.timelines.findIndex(
        (x) => x.timeLineId === action.payload.timeLineId,
      );
      const timeLines =
        i > -1
          ? state.timelines
              .slice(0, i)
              .concat([action.payload])
              .concat(state.timelines.slice(i + 1))
          : state.timelines.concat([action.payload]);
      state.timelines = timeLines;
    },
    replaceTimelines: (state, action: PayloadAction<TimeZoneInfo[]>) => {
      state.timelines = action.payload;
    },
  },
});

export const { createOrUpdateTimeline, deleteTimeline, replaceTimelines } =
  timelineSlice.actions;

export default timelineSlice.reducer;
