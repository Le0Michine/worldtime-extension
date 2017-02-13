import * as React from "react";
import { Link, IndexLink } from "react-router";
import { connect, ActionCreator } from "react-redux";
import { bindActionCreators } from "redux";

import { TimeLine, Clock, TimeSelector } from "../../app.common/components";
import AddNewTimeline from "./AddNewTimeline";
import { TimeLineControls } from "./TimeLineControls";
import { NavTab } from "./NavTab";
import { DisplaySettingsInfo, TimeZoneInfo, createTimeZoneInfo, getOffset, getHoursWithOffset } from "../../app.common/models";
import { AppState, AppStoreDispatcher } from "../../app.common/store";
import { removeTimeLine, startEdit, swapTimeLines, changeShowDSTSetting, changeShowTimezoneIdSetting, changeShowUTCOffsetSetting } from "../../app.common/actions";
// const style = require("./DisplaySettings.css");

interface DisplaySettingsDispatchProps {
  changeShowUTCOffsetSetting?: ActionCreator<any>;
  changeShowTimezoneIdSetting?: ActionCreator<any>;
  changeShowDSTSetting?: ActionCreator<any>;
}

interface DisplaySettingsStateProps {
  displaySettings?: DisplaySettingsInfo;
}

type DisplaySettingsProps = DisplaySettingsStateProps & DisplaySettingsDispatchProps;

@connect<DisplaySettingsStateProps, DisplaySettingsDispatchProps, DisplaySettingsProps>(
  (state: AppState) => ({
    displaySettings: state.displaySettings
  } as DisplaySettingsStateProps),
  {
    changeShowDSTSetting: changeShowDSTSetting as ActionCreator<any>,
    changeShowTimezoneIdSetting: changeShowTimezoneIdSetting as ActionCreator<any>,
    changeShowUTCOffsetSetting: changeShowUTCOffsetSetting as ActionCreator<any>,
  }
)
export class DisplaySettings extends React.Component<DisplaySettingsProps, any> {
  render() {
    const { displaySettings, changeShowUTCOffsetSetting, changeShowTimezoneIdSetting, changeShowDSTSetting } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="showUTCOffset">Show UTC offset</label>
          </div>
          <div className="col-md-2">
            <input id="showUTCOffset" type="checkbox" checked={displaySettings.showUTCOffset} onChange={(event) => changeShowUTCOffsetSetting(event.target.checked)} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="showTZId">Show Timezone name</label>
          </div>
          <div className="col-md-2">
            <input id="showTZId" type="checkbox" checked={displaySettings.showTimeZoneId} onChange={(event) => changeShowTimezoneIdSetting(event.target.checked)} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label>Show DST (daylight saving time)</label>
          </div>
          <div className="col-md-3">
            <select value={displaySettings.showDST} onChange={(event) => changeShowDSTSetting(event.target.value)}>
              <option value="hide">hide</option>
              <option value="DST">show DST</option>
              <option value="Summer/Winter">show Summer/Winter</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}