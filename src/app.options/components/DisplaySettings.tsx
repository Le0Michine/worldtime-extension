import { FormControlLabel } from "material-ui/Form";
import { MenuItem } from "material-ui/Menu";
import Switch from "material-ui/Switch";
import * as React from "react";
import { ActionCreator, connect } from "react-redux";
import Select from "material-ui/Select";
import { FormControl } from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";

import {
  changeDarkThemeSetting,
  changePrimaryColor,
  changeSecondaryColor,
  changeShowControlPanelSetting,
  changeShowDSTSetting,
  changeShowTimezoneIdSetting,
  changeShowUTCOffsetSetting,
} from "../../app.common/actions";
import { DisplaySettingsInfo } from "../../app.common/models";
import { AppTheme } from "../../app.common/models/AppTheme";
import { IAppState } from "../../app.common/store";
import { ColorName, getColorNameById } from "../../app.common/themes/themes";
import { ColorSelector } from "./ColorSelector";

interface DisplaySettingsDispatchProps {
  changeShowUTCOffsetSetting?: ActionCreator<any>;
  changeShowTimezoneIdSetting?: ActionCreator<any>;
  changeShowDSTSetting?: ActionCreator<any>;
  changeShowControlPanelSetting?: ActionCreator<any>;
  changeDarkThemeSetting?: ActionCreator<boolean>;
  changePrimaryColorSetting?: ActionCreator<string>;
  changeSecondaryColorSetting?: ActionCreator<string>;
}

interface DisplaySettingsStateProps {
  displaySettings?: DisplaySettingsInfo;
  theme?: AppTheme;
}

type DisplaySettingsProps = DisplaySettingsStateProps & DisplaySettingsDispatchProps;

class DisplaySettingsImpl extends React.Component<DisplaySettingsProps, any> {

  renderColorMenuItem(color: ColorName) {
    return (
      <MenuItem key={color.id} value={color.id} style={{ textTransform: "capitalize" }}>{color.name}</MenuItem>
    );
  }

  render() {
    const {
      displaySettings,
      changeShowUTCOffsetSetting,
      changeShowTimezoneIdSetting,
      changeShowDSTSetting,
      changeShowControlPanelSetting,
      changeDarkThemeSetting,
      changePrimaryColorSetting,
      changeSecondaryColorSetting,
      theme,
    } = this.props;

    const primary = getColorNameById(theme.palette.primary);
    const secondary = getColorNameById(theme.palette.secondary);

    return (
      <div>
        <div className="row">
          <div className="col-6">
            <FormControlLabel
              control={
                <Switch
                  checked={displaySettings.useDarkTheme}
                  onChange={(event, value) => changeDarkThemeSetting(value)}
                />
              }
              label="Use dark theme"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <FormControlLabel
              control={
                <Switch
                  checked={displaySettings.showUTCOffset}
                  onChange={(event, value) => changeShowUTCOffsetSetting(value)}
                />
              }
              label="Show UTC offset"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <FormControlLabel
              control={
                <Switch
                  checked={displaySettings.showTimeZoneId}
                  onChange={(event, value) => changeShowTimezoneIdSetting(value)}
                />
              }
              label="Show Timezone name"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <FormControlLabel
              control={
                <Switch
                  checked={displaySettings.showControlPanel}
                  onChange={(event, value) => changeShowControlPanelSetting(value)}
                />
              }
              label="Show bottom panel"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <FormControl fullWidth>
              <InputLabel htmlFor="showDstSetting">Show DST (daylight saving time) DST</InputLabel>
              <Select
                value={displaySettings.showDST}
                onChange={(event) => changeShowDSTSetting(event.target.value)}
                input={<Input name="showDstSetting" id="showDstSetting" />}
              >
                <MenuItem value="hide">hide</MenuItem>
                <MenuItem value="DST">DST</MenuItem>
                <MenuItem value="Summer/Winter">Summer/Winter</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <ColorSelector
              id="primary"
              label="Primary color"
              color={primary}
              onChange={(color) => changePrimaryColorSetting(color.id)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <ColorSelector
              id="secondary"
              label="Secondary color"
              color={secondary}
              onChange={(color) => changeSecondaryColorSetting(color.id)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export const DisplaySettings = connect<DisplaySettingsStateProps, DisplaySettingsDispatchProps, DisplaySettingsProps>(
  (state: IAppState) => ({
    displaySettings: state.displaySettings,
    theme: state.theme,
  } as DisplaySettingsStateProps),
  {
    changeShowDSTSetting: changeShowDSTSetting as ActionCreator<any>,
    changeShowTimezoneIdSetting: changeShowTimezoneIdSetting as ActionCreator<any>,
    changeShowUTCOffsetSetting: changeShowUTCOffsetSetting as ActionCreator<any>,
    changeShowControlPanelSetting: changeShowControlPanelSetting as ActionCreator<any>,
    changeDarkThemeSetting: changeDarkThemeSetting as ActionCreator<any>,
    changePrimaryColorSetting: changePrimaryColor as ActionCreator<any>,
    changeSecondaryColorSetting: changeSecondaryColor as ActionCreator<any>,
  }
)(DisplaySettingsImpl);