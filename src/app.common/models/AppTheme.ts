import { Theme } from "material-ui/styles";

import { ColorId } from "../themes/themes";

export interface AppTheme {
    palette: {
        primary: ColorId;
        secondary: ColorId;
    };
}

export type ClassMap = {[className: string]: React.CSSProperties};
export type ComponentThemeStyles = (theme: Theme) => ClassMap;