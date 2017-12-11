import AdjustIcon from "material-ui-icons/Adjust";
import KeyboardArrowLeftIcon from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "material-ui-icons/KeyboardArrowRight";
import SettingsIcon from "material-ui-icons/Settings";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Tooltip from "material-ui/Tooltip";
import * as moment from "moment";
import * as React from "react";
import { ActionCreator, connect } from "react-redux";

import { TopPanel } from "./TopPanel";
import { Timelines } from "./Timelines";
import { BottomPanel } from "./BottomPanel";
import { changeScrollPostion, changeSelectedTimeSpan, resetScrollPostion } from "../../app.common/actions";
import { Clock, Range, TimeLine, TimeSelector } from "../../app.common/components";
import { CalendarEvent, DisplaySettingsInfo, getOffset, ScrollPosition, TimeSpanInfo, getHoursWithOffset, RangeValue } from "../../app.common/models";
import { IAppState } from "../../app.common/store";
import { formatTime } from "../../app.common/util/time";

const style = require("./Layout.css");

interface ILayoutStateProps {
  timeLines?: any[];
  displaySettings?: DisplaySettingsInfo;
  selectedTimeSpan?: TimeSpanInfo;
  rangeColor?: string;
  scrollPosition?: ScrollPosition;
}

interface ILayoutDispatchProps {
  changeSelectedTimeSpan?: ActionCreator<any>,
  changeScrollPostion?: ActionCreator<any>,
  resetScrollPostion?: ActionCreator<any>,
}

type ILayoutProps = ILayoutStateProps & ILayoutDispatchProps;

class LayoutImpl extends React.Component<ILayoutProps, any> {

  get rangeValue(): RangeValue {
    const { position } = this.props.scrollPosition;
    const { startHour, startMinute, endHour, endMinute } = this.props.selectedTimeSpan;
    const { selectionStep } = this.props.displaySettings;
    const stepsInHour = 60 / selectionStep;
    const rangeSize = stepsInHour * 24;

    return {
      valueMin: Math.min(rangeSize, Math.max((startHour + position) * stepsInHour + startMinute / selectionStep, 0)),
      valueMax: Math.max(Math.min((endHour + position) * stepsInHour + endMinute / selectionStep, rangeSize), 0),
      rangeSize,
    };
  }

  render(): React.ReactElement<any> {
    const {
      displaySettings,
      selectedTimeSpan,
      timeLines,
      rangeColor,
      scrollPosition
    } = this.props;
    const scrollStep = scrollPosition.step;
    const { valueMin, valueMax, rangeSize } = this.rangeValue;
    const startTime = moment().hours(selectedTimeSpan.startHour).minutes(selectedTimeSpan.startMinute);
    const endTime = moment().hours(selectedTimeSpan.endHour).minutes(selectedTimeSpan.endMinute);
    if (selectedTimeSpan.endHour === 24) {
      endTime.add({ days: 1 });
    }
    const duration = moment.duration((selectedTimeSpan.endHour - selectedTimeSpan.startHour) * 60 + (selectedTimeSpan.endMinute - selectedTimeSpan.startMinute), "minutes");
    const buttonDisabled = false;
    return (
      <Paper elevation={0} square className="px-3">
        <Paper elevation={0} square className={style.fixedPanel + " " + style.fixedPanelTop}>
          <TopPanel />
        </Paper>
        <Timelines rangeValue={this.rangeValue} rangeColor={rangeColor} />
        <Paper elevation={0} square className={style.fixedPanel + " " + style.fixedPanelBottom}>
          <BottomPanel rangeValue={this.rangeValue} rangeColor={rangeColor} />
        </Paper>
      </Paper>
    );
  }
}

export const Layout = connect<ILayoutStateProps, ILayoutDispatchProps, ILayoutProps>(
  (store: IAppState) => ({
    timeLines: store.timeLines,
    displaySettings: store.displaySettings,
    selectedTimeSpan: store.selectedTimeSpan,
    scrollPosition: store.scrollPosition,
  } as ILayoutProps),
  {
  }
)(LayoutImpl);
