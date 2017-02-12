import * as React from "react";
import { Link, IndexLink } from "react-router";
import { connect, ActionCreator } from "react-redux";
import { bindActionCreators } from "redux";

import { TimeLine, Clock, TimeSelector } from "../../app.common/components";
import AddNewTimeline from "./AddNewTimeline";
import { TimeLineControls } from "./TimeLineControls";
import { NavTab } from "./NavTab";
import { TimeZoneInfo, createTimeZoneInfo, getOffset, getHoursWithOffset } from "../../app.common/models";
import { AppState, AppStoreDispatcher } from "../../app.common/store";
import { removeTimeLine, startEdit, swapTimeLines } from "../../app.common/actions";
const style = require("./OptionsLayout.css");

interface OptionsLayoutDispatchProps {
  swapTimeLines: ActionCreator<any>;
  deleteTimeLine: ActionCreator<any>;
  selectTimeLine: ActionCreator<any>;
}

interface OptionsLayoutStateProps {
  timeLines: TimeZoneInfo[];
  selectedTimeLine: TimeZoneInfo;
}

type OptionsLayoutProps = OptionsLayoutStateProps & OptionsLayoutDispatchProps;

@connect<OptionsLayoutStateProps, OptionsLayoutDispatchProps, OptionsLayoutProps>(
  (state: AppState) => ({
    timeLines: state.timeLines,
    selectedTimeLine: state.editTimeLineForm
  } as OptionsLayoutStateProps),
  {
    swapTimeLines: swapTimeLines as ActionCreator<any>,
    deleteTimeLine: removeTimeLine as ActionCreator<any>,
    selectTimeLine: startEdit as ActionCreator<any>
  }
)
export default class OptionsLayout extends React.Component<OptionsLayoutProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      mouseOverTimeLineIndex: -1
    };
  }

  render() {
    const { mouseOverTimeLineIndex } = this.state;
    const {
      timeLines,
      swapTimeLines,
      selectTimeLine,
      deleteTimeLine,
      selectedTimeLine
    } = this.props;

    const onMouseEnter = (i) => this.setState({ mouseOverTimeLineIndex: i });
    const onMouseLeave = () => this.setState({ mouseOverTimeLineIndex: -1 });

    return (
      <div className={style.app}>
        <div className={style.header}>
          <span className={style.clock}><Clock /></span>
        </div>
        <h1>Selected timelines</h1>
        <div>
          {timeLines.map((tl, index) =>
            <div key={tl.timeLineid} className={style.timeLineContainer} onMouseEnter={() => onMouseEnter(index)} onMouseLeave={() => onMouseLeave()}>
              <TimeLine timeLine={tl} offset={getOffset(tl)} hours={getHoursWithOffset(getOffset(tl))} />
              <div>
                <TimeLineControls
                  onEdit={() => selectTimeLine(tl)}
                  onDelete={() => deleteTimeLine(tl)}
                  onUp={() => swapTimeLines(timeLines, index, index - 1)}
                  onDown={() => swapTimeLines(timeLines, index, index + 1)}
                  upDisabled={!index}
                  downDisabled={index === timeLines.length - 1}
                  show={index === mouseOverTimeLineIndex}
                />
              </div>
            </div>
          )}
        </div>
        <AddNewTimeline />
      </div>
    );
  }
}