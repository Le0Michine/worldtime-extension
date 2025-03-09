import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../app.common/store.js";
import { getTheme } from "../app.common/themes/themes.js";
import { Layout } from "./components/Layout.js";

export const AppMain = () => {
  const appTheme = useSelector((state: RootState) => state.theme);
  const { useDarkTheme } = useSelector(
    (state: RootState) => state.displaySettings,
  );
  useEffect(() => {
    setTimeout(() => {
      const { clientWidth, clientHeight } = document.body;
      window.resizeTo(clientWidth, clientHeight);
    }, 100);
  }, []);
  const theme = useMemo(
    () => getTheme(useDarkTheme, appTheme),
    [useDarkTheme, appTheme],
  );
  return (
    <ThemeProvider theme={theme}>
      <Layout rangeColor={theme.palette.secondary.main} />
    </ThemeProvider>
  );
};
