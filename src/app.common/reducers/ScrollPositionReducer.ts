import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScrollPosition } from "../models";

export type ScrollPositionState = ScrollPosition;

export const initialState: ScrollPositionState = {
  maxLimit: 23,
  minLimit: -23,
  position: 0,
  step: 6,
};

export const scrollPositionSlice = createSlice({
  name: "scrollPositionSlice",
  initialState,
  reducers: {
    resetScrollPosition: (state) => {
      state.position = 0;
    },
    setScrollPosition: (state, action: PayloadAction<number>) => {
      if (
        action.payload >= state.minLimit &&
        action.payload <= state.maxLimit
      ) {
        state.position = action.payload;
      }
    },
  },
});

export const { resetScrollPosition, setScrollPosition } =
  scrollPositionSlice.actions;

export default scrollPositionSlice.reducer;
