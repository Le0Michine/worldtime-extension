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
  rangeValue: RangeValue;
}

interface ILayoutDispatchProps {
  changeSelectedTimeSpan?: ActionCreator<any>,
  changeScrollPostion?: ActionCreator<any>,
  resetScrollPostion?: ActionCreator<any>,
}

type ILayoutProps = ILayoutStateProps & ILayoutDispatchProps;

class TimelinesImpl extends React.Component<ILayoutProps, any> {
  render(): React.ReactElement<any> {
    const {
      displaySettings,
      timeLines,
      rangeColor,
      scrollPosition,
      rangeValue
    } = this.props;
    const { valueMin, valueMax, rangeSize } = rangeValue;
    return (
      <div className={`${style.app} mx-auto`}>
        <TimeSelector valueMin={valueMin} valueMax={valueMax} rangeSize={rangeSize} color={rangeColor} />
        <div>
          {timeLines.map(tl =>
            <TimeLine key={tl.name} scrollPosition={scrollPosition.position} timeLine={tl} offset={getOffset(tl)} hours={getHoursWithOffset(getOffset(tl))} displaySettings={displaySettings} />
          )}
        </div>
      </div>
    );
  }
}

export const Timelines = connect<ILayoutStateProps, ILayoutDispatchProps, ILayoutProps>(
  (store: IAppState) => ({
    timeLines: store.timeLines,
    displaySettings: store.displaySettings,
    scrollPosition: store.scrollPosition,
  } as ILayoutProps),
  {
    changeSelectedTimeSpan: changeSelectedTimeSpan,
    changeScrollPostion: changeScrollPostion,
    resetScrollPostion: resetScrollPostion,
  }
)(TimelinesImpl);
