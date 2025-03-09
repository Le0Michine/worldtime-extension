import { useDispatch, useSelector } from "react-redux";

import { DSTSetting } from "../../app.common/models";
import { RootState } from "../../app.common/store";
import { getColorNameById } from "../../app.common/themes/themes";
import { ColorSelector } from "./ColorSelector";
import {
  set24HoursFormat,
  setDarkTheme,
  setSelectionStep,
  setShowControlPanel,
  setShowDateLabels,
  setShowDst,
  setShowTzId,
  setShowTzShortName,
  setShowUtcOffset,
} from "../../app.common/reducers/DisplaySettingsReducer";
import {
  setPrimaryColor,
  setSecondaryColor,
} from "../../app.common/reducers/ThemeReducer";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";

export const DisplaySettings = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  const displaySettings = useSelector(
    (state: RootState) => state.displaySettings,
  );

  const primary = getColorNameById(theme.palette.primary);
  const secondary = getColorNameById(theme.palette.secondary);

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <Typography variant="h1" className="mt-2">
            User interface
          </Typography>
          <div className="row">
            <div className="col-12">
              <FormControlLabel
                control={
                  <Switch
                    checked={displaySettings.showTimeZoneId}
                    onChange={(event, value) => dispatch(setShowTzId(value))}
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
                    onChange={(event, value) =>
                      dispatch(setShowTzShortName(value))
                    }
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
                    onChange={(event, value) =>
                      dispatch(setShowUtcOffset(value))
                    }
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
                    onChange={(event, value) =>
                      dispatch(setShowControlPanel(value))
                    }
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
                    onChange={(event, value) =>
                      dispatch(setShowDateLabels(value))
                    }
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
                    onChange={(event, value) =>
                      dispatch(set24HoursFormat(value))
                    }
                  />
                }
                label="Use 24 hours format"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <FormControl fullWidth>
                <InputLabel htmlFor="showDstSetting">
                  Show DST (daylight saving time) flag
                </InputLabel>
                <Select
                  value={displaySettings.showDST}
                  onChange={(event) =>
                    dispatch(setShowDst(event.target.value as DSTSetting))
                  }
                  input={<Input name="showDstSetting" id="showDstSetting" />}
                >
                  <MenuItem value="hide">Hide</MenuItem>
                  <MenuItem value="DST">DST</MenuItem>
                  <MenuItem value="Summer/Winter">Summer/Winter</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <FormControl fullWidth>
                <InputLabel htmlFor="timeSelectionStepSetting">
                  Time selection step
                </InputLabel>
                <Select
                  value={displaySettings.selectionStep}
                  onChange={(event) =>
                    dispatch(setSelectionStep(event.target.value as number))
                  }
                  input={
                    <Input
                      name="timeSelectionStepSetting"
                      id="timeSelectionStepSetting"
                    />
                  }
                >
                  <MenuItem value={15}>15 minutes</MenuItem>
                  <MenuItem value={30}>30 minutes</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="col-6">
          <Typography variant="h1" className="mt-2">
            Theme
          </Typography>
          <div className="row">
            <div className="col-12">
              <FormControlLabel
                control={
                  <Switch
                    checked={displaySettings.useDarkTheme}
                    onChange={(event, value) => dispatch(setDarkTheme(value))}
                  />
                }
                label="Use dark theme"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <ColorSelector
                id="primary"
                label="Primary color"
                color={primary}
                onChange={(color) => dispatch(setPrimaryColor(color.id))}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <ColorSelector
                id="secondary"
                label="Secondary color"
                color={secondary}
                onChange={(color) => dispatch(setSecondaryColor(color.id))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
