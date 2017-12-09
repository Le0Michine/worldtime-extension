import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AppTheme } from "../app.common/models/AppTheme";
import { IAppState } from "../app.common/store";
import { getTheme } from "../app.common/themes/themes";
import OptionsLayout from "./components/OptionsLayout";

interface OptionsMainDispatchProps {
}

interface OptionsMainStateProps {
  useDarkTheme?: boolean;
  theme?: AppTheme
}

type OptionsMainProps = OptionsMainStateProps & OptionsMainDispatchProps;

class AppOptionsMain extends React.Component<OptionsMainProps, any> {
  render() {
    const { useDarkTheme, theme } = this.props;

    return (
      <MuiThemeProvider theme={getTheme(useDarkTheme, theme)}>
        <Router>
          <Route path="/" component={OptionsLayout}></Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default connect<OptionsMainStateProps, OptionsMainDispatchProps, OptionsMainProps>(
  (state: IAppState) => ({
    useDarkTheme: state.displaySettings.useDarkTheme,
    theme: state.theme,
  } as OptionsMainStateProps),
)(AppOptionsMain);
