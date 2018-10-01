import * as React from "react";
import { connect } from "react-redux";
import { ActionCreator } from "redux";

import { changeScrollPostion, changeSelectedTimeSpan, resetScrollPostion } from "../../app.common/actions";
import { TimeLine, TimeSelector } from "../../app.common/components";
import {
  DisplaySettingsInfo,
  getHoursWithOffset,
  getOffset,
  RangeValue,
  ScrollPosition,
  TimeSpanInfo,
} from "../../app.common/models";
import { IAppState } from "../../app.common/store";
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
      <div className={`${style.app} mx-auto`} id="timeLinesContainer">
        <TimeSelector valueMin={valueMin} valueMax={valueMax} rangeSize={rangeSize} color={rangeColor} />
        <div>
          {timeLines.map(tl =>
            <TimeLine key={tl.name} scrollPosition={scrollPosition.position} timeLine={tl} offset={getOffset(tl)} hourDayList={getHoursWithOffset(getOffset(tl))} displaySettings={displaySettings} />
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
