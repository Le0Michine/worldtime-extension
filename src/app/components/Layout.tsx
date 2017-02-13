import * as React from "react";
import { connect, ActionCreator } from "react-redux";
import * as moment from "moment";

import { TimeLine, Clock, Range, Input, TimeSelector } from "../../app.common/components";
import { changeSelectedTimeSpan } from "../../app.common/actions";
import { TimeZoneInfo, getOffset, getRelativeOffset, getHoursWithOffset, DisplaySettingsInfo, TimeSpanInfo } from "../../app.common/models";
import { AppState } from "../../app.common/store";
const style = require("./Layout.css");

interface LayoutStateProps {
  timeLines?: any[];
  displaySettings?: DisplaySettingsInfo;
  selectedTimeSpan?: TimeSpanInfo;
}

interface LayoutDispatchProps {
  changeSelectedTimeSpan?: ActionCreator<any>
}

type LayoutProps = LayoutStateProps & LayoutDispatchProps;

@connect<LayoutStateProps, LayoutDispatchProps, LayoutProps>(
  (store: AppState) => ({
    timeLines: store.timeLines,
    displaySettings: store.displaySettings,
    selectedTimeSpan: store.selectedTimeSpan
  } as LayoutProps),
  { changeSelectedTimeSpan: changeSelectedTimeSpan }
)
export class Layout extends React.Component<LayoutProps, any> {
  render(): React.ReactElement<any> {
    const { displaySettings, selectedTimeSpan, changeSelectedTimeSpan } = this.props;
    const valueMin = selectedTimeSpan.startHour * 2 + selectedTimeSpan.startMinute / 30;
    const valueMax = selectedTimeSpan.endHour * 2 + selectedTimeSpan.endMinute / 30;
    return (
      <div>
        <div className={style.app}>
          <div className={style.header}>
            <span className={style.clock}><Clock /></span>
            <a className={style.settingsBtn + " material-icons"} target="_blank" href="options.html">settings</a>
          </div>
        </div>
        <div className={style.app}>
          <TimeSelector selectedTimeSpan={selectedTimeSpan}/>
          <div>
            {this.props.timeLines.map(tl => 
              <TimeLine key={tl.name} timeLine={tl} offset={getOffset(tl)} hours={getHoursWithOffset(getOffset(tl))} displaySettings={displaySettings} />
            )}
          </div>
        </div>
        <div className={style.app}>
          <div className={style.timeSpanSelector}>
            <Range rangeSize={48} valueMin={valueMin} valueMax={valueMax} onChange={({valueMin, valueMax}) => changeSelectedTimeSpan(valueMin, valueMax)} />
          </div>
          <div className={style.timeSpanSelector}>
            <span>{moment().hours(selectedTimeSpan.startHour).minutes(selectedTimeSpan.startMinute).format("HH:mm")} - {moment().hours(selectedTimeSpan.endHour).minutes(selectedTimeSpan.endMinute).format("HH:mm")}</span>
            {/*<div className={style.timeSpanSelectorInput}>
              <Input placeholder="hh" />
            </div><span> : </span>
            <div className={style.timeSpanSelectorInput}>
              <Input placeholder="mm" />
            </div><span> - </span>
            <div className={style.timeSpanSelectorInput}>
              <Input placeholder="hh" />
            </div><span> : </span>
            <div className={style.timeSpanSelectorInput}>
              <Input placeholder="mm" />
            </div>*/}
          </div>
        </div>
      </div>
    );
  }
}