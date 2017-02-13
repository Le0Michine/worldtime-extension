import * as React from "react";
import { connect } from "react-redux";

import { TimeLine, Clock } from "../../app.common/components";
import { TimeZoneInfo, getOffset, getHoursWithOffset, DisplaySettingsInfo } from "../../app.common/models";
import { AppState } from "../../app.common/store";
const style = require("./Layout.css");

interface LayoutStateProps {
  timeLines?: any[];
  displaySettings?: DisplaySettingsInfo;
}

interface LayoutDispatchProps {
}

type LayoutProps = LayoutStateProps & LayoutDispatchProps;

@connect<LayoutStateProps, LayoutDispatchProps, LayoutProps>(
  (store: AppState) => ({
    timeLines: store.timeLines,
    displaySettings: store.displaySettings
  } as LayoutProps)
)
export class Layout extends React.Component<LayoutProps, any> {
  render(): React.ReactElement<any> {
    const { displaySettings } = this.props;
    return (
      <div className={style.app}>
        <div className={style.header}>
          <span className={style.clock}><Clock /></span>
          <a className={style.settingsBtn + " material-icons"} target="_blank" href="options.html">settings</a>
        </div>
        <div>
          {this.props.timeLines.map(tl => 
            <TimeLine key={tl.name} timeLine={tl} offset={getOffset(tl)} hours={getHoursWithOffset(getOffset(tl))} displaySettings={displaySettings} />
          )}
        </div>
      </div>
    );
  }
}