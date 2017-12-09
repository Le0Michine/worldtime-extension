import { AppTheme } from "../app.common/models/AppTheme";
import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { IAppState } from "../app.common/store";
import { Layout } from "./components/Layout";
import { getDefaultColor, getTheme } from "../app.common/themes/themes";

interface MainDispatchProps {
}

interface MainStateProps {
  useDarkTheme?: boolean;
  appTheme?: AppTheme;
}

type MainProps = MainStateProps & MainDispatchProps;

class AppMain extends React.Component<MainProps, any> {
  render() {
    const { useDarkTheme, appTheme } = this.props;
    const theme = getTheme(useDarkTheme, appTheme);
    return (
      <MuiThemeProvider theme={theme}>
        <Layout rangeColor={getDefaultColor(theme.palette.secondary)}/>
      </MuiThemeProvider>
    );
  }
}

export default connect<MainStateProps, MainDispatchProps, MainProps>(
  (state: IAppState) => ({
    useDarkTheme: state.displaySettings.useDarkTheme,
    appTheme: state.theme,
  } as MainStateProps),
)(AppMain);
