import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppTheme } from "../models";
import {
  ColorId,
  initialPalette,
  isValidColorId,
} from "../themes/themes";

export type ThemeState = AppTheme;

export const initialState: ThemeState = {
  palette: initialPalette,
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState: initialState,
  reducers: {
    setPrimaryColor: (state, action: PayloadAction<ColorId>) => {
      if (isValidColorId(action.payload)) {
        state.palette.primary = action.payload;
      }
    },
    setSecondaryColor: (state, action: PayloadAction<ColorId>) => {
      if (isValidColorId(action.payload)) {
        state.palette.secondary = action.payload;
      }
    },
  },
});

export const { setPrimaryColor, setSecondaryColor } = themeSlice.actions;

export default themeSlice.reducer;
