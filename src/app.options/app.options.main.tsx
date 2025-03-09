import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { AppTheme } from "../app.common/models/AppTheme.js";
import { RootState } from "../app.common/store.js";
import { getTheme } from "../app.common/themes/themes.js";
import { OptionsLayout } from "./components/OptionsLayout.js";


export const AppOptionsMain = () => {
  const appTheme = useSelector((state: RootState) => state.theme);
  const { useDarkTheme } = useSelector(
    (state: RootState) => state.displaySettings,
  );

  return (
    <ThemeProvider theme={getTheme(useDarkTheme, appTheme)}>
      <OptionsLayout />
    </ThemeProvider>
  );
};
