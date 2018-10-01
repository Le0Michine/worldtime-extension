import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { ActionCreator } from "redux";

import { changeScrollPostion, changeSelectedTimeSpan, resetScrollPostion } from "../../app.common/actions";
import { Range } from "../../app.common/components";
import { CalendarEvent, DisplaySettingsInfo, RangeValue, ScrollPosition, TimeSpanInfo } from "../../app.common/models";
import { IAppState } from "../../app.common/store";
import { formatTime } from "../../app.common/util/time";
import * as style from "./Layout.scss";

interface ILayoutStateProps {
  timeLines?: any[];
  displaySettings?: DisplaySettingsInfo;
  selectedTimeSpan?: TimeSpanInfo;
  rangeColor?: string;
  scrollPosition?: ScrollPosition;
  rangeValue: RangeValue;
}

interface ILayoutDispatchProps {
  changeSelectedTimeSpan?: ActionCreator<any>,
  changeScrollPostion?: ActionCreator<any>,
  resetScrollPostion?: ActionCreator<any>,
}

type ILayoutProps = ILayoutStateProps & ILayoutDispatchProps;

class BottomPanelImpl extends React.Component<ILayoutProps, any> {

  updateSelectedTimeRange(start: number, end: number) {
    const { position } = this.props.scrollPosition;
    const { selectionStep } = this.props.displaySettings;
    const stepsInHour = 60 / selectionStep;
    const startHour = Math.floor(start / stepsInHour) - position;
    const startMinute = (start % stepsInHour) * selectionStep;
    const endHour = Math.floor(end / stepsInHour) - position;
    const endMinute = (end % stepsInHour) * selectionStep;
    this.props.changeSelectedTimeSpan(startHour, startMinute, endHour, endMinute);
  }

  resetScrollPosition() {
    this.props.resetScrollPostion();
  }

  render(): React.ReactElement<any> {
    const {
      displaySettings,
      selectedTimeSpan,
      timeLines,
      rangeColor,
      scrollPosition,
      rangeValue,
    } = this.props;
    const scrollStep = scrollPosition.step;
    const { valueMin, valueMax, rangeSize } = rangeValue;
    const startTime = moment().hours(selectedTimeSpan.startHour).minutes(selectedTimeSpan.startMinute);
    const endTime = moment().hours(selectedTimeSpan.endHour).minutes(selectedTimeSpan.endMinute);
    if (selectedTimeSpan.endHour === 24) {
      endTime.add({ days: 1 });
    }
    const duration = moment.duration((selectedTimeSpan.endHour - selectedTimeSpan.startHour) * 60 + (selectedTimeSpan.endMinute - selectedTimeSpan.startMinute), "minutes");
    const buttonDisabled = false;
    return (
      <div className={style.app + " mx-auto pb-2"}>
        <div className={`${style.timeSpanSelector} mt-0`}>
          <Range color={rangeColor} rangeSize={rangeSize} valueMin={valueMin} valueMax={valueMax} onChange={({ valueMin, valueMax }) => this.updateSelectedTimeRange(valueMin, valueMax)} />
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
    );
  }
}

export const BottomPanel = connect<ILayoutStateProps, ILayoutDispatchProps, ILayoutProps>(
  (store: IAppState) => ({
    timeLines: store.timeLines,
    displaySettings: store.displaySettings,
    selectedTimeSpan: store.selectedTimeSpan,
    scrollPosition: store.scrollPosition,
  } as ILayoutProps),
  {
    changeSelectedTimeSpan: changeSelectedTimeSpan,
  }
)(BottomPanelImpl);
