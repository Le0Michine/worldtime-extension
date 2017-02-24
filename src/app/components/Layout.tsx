// tslint:disable:max-line-length
// tslint:disable:typedef
import * as React from "react";
import { connect, ActionCreator } from "react-redux";
import * as moment from "moment";

import { TimeLine, Clock, Range, TimeSelector } from "../../app.common/components";
import { changeSelectedTimeSpan } from "../../app.common/actions";
import { getOffset, getHoursWithOffset, DisplaySettingsInfo, TimeSpanInfo, CalendarEvent } from "../../app.common/models";
import { IAppState } from "../../app.common/store";
const style = require("./Layout.css");

interface ILayoutStateProps {
  timeLines?: any[];
  displaySettings?: DisplaySettingsInfo;
  selectedTimeSpan?: TimeSpanInfo;
}

interface ILayoutDispatchProps {
  changeSelectedTimeSpan?: ActionCreator<any>
}

type ILayoutProps = ILayoutStateProps & ILayoutDispatchProps;

@connect<ILayoutStateProps, ILayoutDispatchProps, ILayoutProps>(
  (store: IAppState) => ({
    timeLines: store.timeLines,
    displaySettings: store.displaySettings,
    selectedTimeSpan: store.selectedTimeSpan
  } as ILayoutProps),
  { changeSelectedTimeSpan: changeSelectedTimeSpan }
)
export class Layout extends React.Component<ILayoutProps, any> {
  render(): React.ReactElement<any> {
    const { displaySettings, selectedTimeSpan, changeSelectedTimeSpan, timeLines } = this.props;
    const valueMin = selectedTimeSpan.startHour * 2 + selectedTimeSpan.startMinute / 30;
    const valueMax = selectedTimeSpan.endHour * 2 + selectedTimeSpan.endMinute / 30;
    const startTime = moment().hours(selectedTimeSpan.startHour).minutes(selectedTimeSpan.startMinute);
    const endTime = moment().hours(selectedTimeSpan.endHour).minutes(selectedTimeSpan.endMinute);
    if (selectedTimeSpan.endHour === 24) {
      endTime.add({ days: 1 });
    }
    const duration = moment.duration((selectedTimeSpan.endHour - selectedTimeSpan.startHour) * 60 + (selectedTimeSpan.endMinute - selectedTimeSpan.startMinute), "minutes");
    const buttonDisabled = false;
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
            {timeLines.map(tl =>
              <TimeLine key={tl.name} timeLine={tl} offset={getOffset(tl)} hours={getHoursWithOffset(getOffset(tl))} displaySettings={displaySettings} />
            )}
          </div>
        </div>
        <div className={style.app}>
          <div className={style.timeSpanSelector}>
            <Range rangeSize={48} valueMin={valueMin} valueMax={valueMax} onChange={({valueMin, valueMax}) => changeSelectedTimeSpan(valueMin, valueMax)} />
          </div>
          {displaySettings.showControlPanel ? (<div className={style.timeSpanSelector}>
            <div className="bottom-panel-container">
              <div className="">
                <span>{startTime.format("HH:mm")} - {endTime.format("HH:mm")} duration: {duration.asHours().toFixed(1)}h</span>
              </div>
              <div className="">
                <button
                  className={`btn btn-default btn-material right-space ${ buttonDisabled ? "disabled" : ""}`}
                  onClick={() => CalendarEvent.copyToClipboard(selectedTimeSpan, timeLines[0].timeZoneId, timeLines)}
                >Copy</button>
                <button
                  className={`btn btn-default btn-material right-space ${ buttonDisabled ? "disabled" : ""}`}
                  onClick={() => CalendarEvent.getGoogleCalendarLink(selectedTimeSpan, timeLines[0].timeZoneId, timeLines)}
                >To Google Cal</button>
                <button
                  className={`btn btn-default btn-material ${ buttonDisabled ? "disabled" : ""}`}
                  onClick={() => CalendarEvent.exportToICS(selectedTimeSpan, timeLines[0].timeZoneId, timeLines)}
                >Export to .ics</button>
              </div>
            </div>
          </div>) : null}
        </div>
      </div>
    );
  }
}