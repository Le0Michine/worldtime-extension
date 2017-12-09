import { formatTime } from "../../app.common/util/time";
import * as React from "react";
import { connect, ActionCreator } from "react-redux";
import * as moment from "moment";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import Icon from "material-ui/Icon";
import SettingsIcon from 'material-ui-icons/Settings';
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import { withTheme, Theme } from "material-ui/styles";

import { TimeLine, Clock, Range, TimeSelector } from "../../app.common/components";
import { changeSelectedTimeSpan } from "../../app.common/actions";
import { getOffset, getHoursWithOffset, DisplaySettingsInfo, TimeSpanInfo, CalendarEvent } from "../../app.common/models";
import { IAppState } from "../../app.common/store";
const style = require("./Layout.css");

interface ILayoutStateProps {
  timeLines?: any[];
  displaySettings?: DisplaySettingsInfo;
  selectedTimeSpan?: TimeSpanInfo;
  rangeColor?: string;
}

interface ILayoutDispatchProps {
  changeSelectedTimeSpan?: ActionCreator<any>
}

type ILayoutProps = ILayoutStateProps & ILayoutDispatchProps;

class LayoutImpl extends React.Component<ILayoutProps, any> {

  render(): React.ReactElement<any> {
    const { displaySettings, selectedTimeSpan, changeSelectedTimeSpan, timeLines, rangeColor } = this.props;
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
      <Paper elevation={0} square className="px-3">
        <div className={style.app + " mx-auto"}>
          <div className={style.header}>
            <span className={style.clock}><Clock /></span>
            <IconButton aria-label="settings" target="_blank" href="options.html">
              <SettingsIcon />
            </IconButton>
          </div>
        </div>
        <div className={style.app + " mx-auto"}>
          <TimeSelector selectedTimeSpan={selectedTimeSpan} color={rangeColor} />
          <div>
            {timeLines.map(tl =>
              <TimeLine key={tl.name} timeLine={tl} offset={getOffset(tl)} hours={getHoursWithOffset(getOffset(tl))} displaySettings={displaySettings} />
            )}
          </div>
        </div>
        <div className={style.app + " mx-auto pb-2"}>
          <div className={style.timeSpanSelector}>
            <Range color={rangeColor} rangeSize={48} valueMin={valueMin} valueMax={valueMax} onChange={({ valueMin, valueMax }) => changeSelectedTimeSpan(valueMin, valueMax)} />
          </div>
          {displaySettings.showControlPanel ? (<div className={style.timeSpanSelector}>
            <div className="bottom-panel-container">
              <div className="">
                <Typography type="subheading">
                  {formatTime(startTime, displaySettings.use24HoursTime)} - {formatTime(endTime, displaySettings.use24HoursTime)} ({duration.asHours().toFixed(1)}h)
                </Typography>
              </div>
              <div className="">
                <Button
                  raised
                  color="primary"
                  onClick={() => CalendarEvent.copyToClipboard(selectedTimeSpan, timeLines[0].timeZoneId, timeLines)}
                >Copy</Button>
                <Button
                  raised
                  color="primary"
                  className="mx-2"
                  onClick={() => CalendarEvent.getGoogleCalendarLink(selectedTimeSpan, timeLines[0].timeZoneId, timeLines)}
                >To Google Cal</Button>
                <Button
                  raised
                  color="primary"
                  onClick={() => CalendarEvent.exportToICS(selectedTimeSpan, timeLines[0].timeZoneId, timeLines)}
                >Export to .ics</Button>
              </div>
            </div>
          </div>) : null}
        </div>
      </Paper>
    );
  }
}

export const Layout = connect<ILayoutStateProps, ILayoutDispatchProps, ILayoutProps>(
  (store: IAppState) => ({
    timeLines: store.timeLines,
    displaySettings: store.displaySettings,
    selectedTimeSpan: store.selectedTimeSpan,
  } as ILayoutProps),
  { changeSelectedTimeSpan: changeSelectedTimeSpan }
)(LayoutImpl);
