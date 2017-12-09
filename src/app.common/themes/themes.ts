import { AppTheme } from "../models/AppTheme";
import * as colors from "material-ui/colors";
import createMuiTheme, { Theme } from "material-ui/styles/createMuiTheme";
import { Palette } from "material-ui/styles/createPalette";
import { TypographyOptions } from "material-ui/styles/createTypography";
import { Color } from "material-ui";

const defaultLight = createMuiTheme();
const defaultDark = createMuiTheme({ palette: { type: "dark" } });

const palette: Partial<Palette> = {
    primary: colors.blue,
    secondary: colors.teal,
};

function getTypography(dark: boolean): Partial<TypographyOptions> {
    const defaults = dark ? defaultDark : defaultLight;
    return {
        display2: Object.assign({}, defaults.typography.display2, {
            fontWeight: 100
        }),
        display1: Object.assign({}, defaults.typography.display1, {
            fontWeight: 100
        }),
    };
}

function getPalette(dark: boolean, overridePalette: Partial<Palette>): Partial<Palette> {
    return Object.assign({}, palette, overridePalette, {
        type: dark ? "dark" : "light",
    });
}

export const initialPalette = {
    primary: "blue",
    secondary: "teal"
};

export function getTheme(dark: boolean, appTheme: AppTheme): Theme {
    const primary = getColorById(appTheme.palette.primary) || palette.primary;
    const secondary = getColorById(appTheme.palette.secondary) || palette.secondary;
    const overridePalette: Partial<Palette> = {
        primary,
        secondary
    };
    return createMuiTheme({
        palette: getPalette(dark, overridePalette),
        typography: getTypography(dark),
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

export function getColorNameById(colorId: ColorId): ColorName {
    return {
        id: colorId,
        name: colorId.replace(/([a-z](?=[A-Z]))/, "$1 ").toLowerCase()
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
    return Object.keys(colors).filter(x => exclude.indexOf(x.toLowerCase()) < 0).map(getColorNameById);
}
