import { AppTheme } from "../models/AppTheme.js";
import * as colors from "@mui/material/colors";
import { createTheme, type Theme } from "@mui/material/styles";
import type { Color, PaletteOptions } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography.js";
import { useTheme } from "@mui/styles";
import { createMakeAndWithStyles } from "tss-react";

const defaultLight = createTheme();
const defaultDark = createTheme({ palette: { mode: "dark" } });

export const { useStyles, makeStyles } = createMakeAndWithStyles<Theme>({
  useTheme,
});

const palette: Partial<PaletteOptions> = {
  primary: colors.blue,
  secondary: colors.teal,
};

function getTypography(dark: boolean): Partial<TypographyOptions> {
  const defaults = dark ? defaultDark : defaultLight;
  return {
    h1: { ...defaults.typography.h1, fontWeight: 100, fontSize: 34 },
    h2: { ...defaults.typography.h2, fontWeight: 100, fontSize: 34 },
  };
}

function getPalette(
  dark: boolean,
  overridePalette: Partial<PaletteOptions>,
): Partial<PaletteOptions> {
  return {
    ...palette,
    ...overridePalette,
    mode: dark ? "dark" : "light",
  };
}

export const initialPalette = {
  primary: "blue" as ColorId,
  secondary: "teal" as ColorId,
};

export function getTheme(dark: boolean, appTheme: AppTheme): Theme {
  console.log(">>>>> dark", dark);
  const primary = getColorById(appTheme.palette.primary) || palette.primary;
  const secondary =
    getColorById(appTheme.palette.secondary) || palette.secondary;
  const overridePalette: PaletteOptions = {
    primary,
    secondary,
  };
  return createTheme({
    palette: getPalette(dark, overridePalette),
    typography: getTypography(dark),
    components: {
      MuiButtonGroup: {
        styleOverrides: {
          root: {
            // fontSize: "24px"
          },
        },
      },
    },
  });
}

export type ColorId = keyof typeof colors;

export interface ColorName {
  id: ColorId;
  name: string;
}

export function getColorById(colorId: ColorId): Color {
  return colors[colorId] as Color;
}

export function isValidColorId(colorId: string): colorId is ColorId {
  return Boolean(colors[colorId]);
}

export function getColorNameById(colorId: ColorId): ColorName {
  return {
    id: colorId,
    name: colorId.replace(/([a-z](?=[A-Z]))/, "$1 ").toLowerCase(),
  };
}

export function getDefaultColor(color: Color): string {
  return color[400];
}

export function getDefaultColorById(colorId: ColorId): string {
  return getDefaultColor(colors[colorId] as Color);
}

export function getColorNames(): ColorName[] {
  const exclude = ["common"];
  return Object.keys(colors)
    .filter((x) => exclude.indexOf(x.toLowerCase()) < 0)
    .map(getColorNameById);
}
