import { FormControl, FormControlLabel } from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import Switch from "material-ui/Switch";
import Typography from "material-ui/Typography";
import * as React from "react";
import { connect } from "react-redux";
import { ActionCreator } from "redux";

import {
  change24HoursTimeFormatSetting,
  changeDarkThemeSetting,
  changePrimaryColor,
  changeSecondaryColor,
  changeShowControlPanelSetting,
  changeShowDateLabelsSetting,
  changeShowDSTSetting,
  changeShowTimezoneAbbreviationSetting,
  changeShowTimezoneIdSetting,
  changeShowUTCOffsetSetting,
  changeTimeSelectionStepSetting,
} from "../../app.common/actions";
import { DisplaySettingsInfo } from "../../app.common/models";
import { AppTheme } from "../../app.common/models/AppTheme";
import { IAppState } from "../../app.common/store";
import { ColorName, getColorNameById } from "../../app.common/themes/themes";
import { ColorSelector } from "./ColorSelector";

interface DisplaySettingsDispatchProps {
  changeShowUTCOffsetSetting?: ActionCreator<any>;
  changeShowTimezoneIdSetting?: ActionCreator<any>;
  changeShowTimezoneAbbreviationSetting?: ActionCreator<any>;
  changeShowDSTSetting?: ActionCreator<any>;
  changeShowControlPanelSetting?: ActionCreator<any>;
  changeDarkThemeSetting?: ActionCreator<boolean>;
  changePrimaryColorSetting?: ActionCreator<string>;
  changeSecondaryColorSetting?: ActionCreator<string>;
  change24HoursTimeFormatSetting?: ActionCreator<boolean>;
  changeTimeSelectionStepSetting?: ActionCreator<number>;
  changeShowDateLabelsSetting?: ActionCreator<number>;
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
      changeShowTimezoneAbbreviationSetting,
      changeShowDSTSetting,
      changeShowControlPanelSetting,
      change24HoursTimeFormatSetting,
      changeDarkThemeSetting,
      changePrimaryColorSetting,
      changeSecondaryColorSetting,
      changeTimeSelectionStepSetting,
      changeShowDateLabelsSetting,
      theme,
    } = this.props;

    const primary = getColorNameById(theme.palette.primary);
    const secondary = getColorNameById(theme.palette.secondary);

    return (
      <div>
        <div className="row">
          <div className="col-6">
            <Typography type="headline" className="mt-2">User interface</Typography>
            <div className="row">
              <div className="col-12">
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
              <div className="col-12">
                <FormControlLabel
                  control={
                    <Switch
                      checked={displaySettings.showTimeZoneAbbreviation}
                      onChange={(event, value) => changeShowTimezoneAbbreviationSetting(value)}
                    />
                  }
                  label="Show Timezone abbreviation (if available)"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
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
              <div className="col-12">
                <FormControlLabel
                  control={
                    <Switch
                      checked={displaySettings.showControlPanel}
                      onChange={(event, value) => changeShowControlPanelSetting(value)}
                    />
                  }
                  label="Show export panel (at the bottom)"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <FormControlLabel
                  control={
                    <Switch
                      checked={displaySettings.showDateLabels}
                      onChange={(event, value) => changeShowDateLabelsSetting(value)}
                    />
                  }
                  label="Show date labels"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <FormControlLabel
                  control={
                    <Switch
                      checked={displaySettings.use24HoursTime}
                      onChange={(event, value) => change24HoursTimeFormatSetting(value)}
                    />
                  }
                  label="Use 24 hours format"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <FormControl fullWidth>
                  <InputLabel htmlFor="showDstSetting">Show DST (daylight saving time) flag</InputLabel>
                  <Select
                    value={displaySettings.showDST}
                    onChange={(event) => changeShowDSTSetting(event.target.value)}
                    input={<Input name="showDstSetting" id="showDstSetting" />}
                  >
                    <MenuItem value="hide">Hide</MenuItem>
                    <MenuItem value="DST">DST</MenuItem>
                    <MenuItem value="Summer/Winter">Summer/Winter</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <FormControl fullWidth>
                  <InputLabel htmlFor="timeSelectionStepSetting">Time selection step</InputLabel>
                  <Select
                    value={displaySettings.selectionStep}
                    onChange={(event) => changeTimeSelectionStepSetting(event.target.value)}
                    input={<Input name="timeSelectionStepSetting" id="timeSelectionStepSetting" />}
                  >
                    <MenuItem value={15}>15 minutes</MenuItem>
                    <MenuItem value={30}>30 minutes</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="col-6">
            <Typography type="headline" className="mt-2">Theme</Typography>
            <div className="row">
              <div className="col-12">
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
              <div className="col-12">
                <ColorSelector
                  id="primary"
                  label="Primary color"
                  color={primary}
                  onChange={(color) => changePrimaryColorSetting(color.id)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ColorSelector
                  id="secondary"
                  label="Secondary color"
                  color={secondary}
                  onChange={(color) => changeSecondaryColorSetting(color.id)}
                />
              </div>
            </div>
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
    changeShowTimezoneAbbreviationSetting: changeShowTimezoneAbbreviationSetting as ActionCreator<any>,
    changeShowUTCOffsetSetting: changeShowUTCOffsetSetting as ActionCreator<any>,
    changeShowControlPanelSetting: changeShowControlPanelSetting as ActionCreator<any>,
    changeDarkThemeSetting: changeDarkThemeSetting as ActionCreator<any>,
    changePrimaryColorSetting: changePrimaryColor as ActionCreator<any>,
    changeSecondaryColorSetting: changeSecondaryColor as ActionCreator<any>,
    change24HoursTimeFormatSetting: change24HoursTimeFormatSetting as ActionCreator<any>,
    changeTimeSelectionStepSetting: changeTimeSelectionStepSetting as ActionCreator<any>,
    changeShowDateLabelsSetting: changeShowDateLabelsSetting as ActionCreator<any>,
  }
)(DisplaySettingsImpl);
