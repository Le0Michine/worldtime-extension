import { ColorId } from "../themes/themes";
import { Palette } from "material-ui/styles/createPalette";

export interface AppTheme {
    palette: {
        primary: ColorId;
        secondary: ColorId;
    };
}