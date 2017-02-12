import * as React from "react";
import { Link, IndexLink } from "react-router";
import { connect, ActionCreator } from "react-redux";
import { bindActionCreators } from "redux";
import { initialize } from "redux-form";

import { TimeLine, Clock, TimeSelector } from "../../app.common/components";
import AddNewTimeline from "./AddNewTimeline";
import { TimeLineControls } from "./TimeLineControls";
import { NavTab } from "./NavTab";
import { TimeZoneInfo, createTimeZoneInfo } from "../../app.common/models";
import { AppState, AppStoreDispatcher } from "../../app.common/store";
import { removeTimeLine, addTimeLine, selectTimeLine, createOrUpdateTimeLine, replaceTimeLines } from "../../app.common/actions";
const style = require("./OptionsLayout.css");

interface OptionsLayoutDispatchProps {
  updateOrCreateTimeLine: ActionCreator<any>;
  replaceTimeLines: ActionCreator<any>;
  deleteTimeLine: ActionCreator<any>;
  selectTimeLine: ActionCreator<any>;
  fillForm: ActionCreator<any>;
}

interface OptionsLayoutStateProps {
  router?: any;
  children?: any;
  timeLines: TimeZoneInfo[];
  selectedTimeLineId: number;
}

type OptionsLayoutProps = OptionsLayoutStateProps & OptionsLayoutDispatchProps;

@connect<OptionsLayoutStateProps, OptionsLayoutDispatchProps, OptionsLayoutProps>(
  state => ({
    timeLines: state.timeLines,
    selectedTimeLineId: state.selectedTimeLineId
  } as OptionsLayoutStateProps),
  {
    updateOrCreateTimeLine: createOrUpdateTimeLine as ActionCreator<any>,
    replaceTimeLines: replaceTimeLines as ActionCreator<any>,
    deleteTimeLine: removeTimeLine as ActionCreator<any>,
    selectTimeLine: selectTimeLine as ActionCreator<any>,
    fillForm: initialize as ActionCreator<any>
  }
)
export default class OptionsLayout extends React.Component<OptionsLayoutProps, React.ComponentState> {
  render() {
    const {
      router,
      timeLines,
      fillForm,
      replaceTimeLines,
      selectTimeLine,
      deleteTimeLine,
      updateOrCreateTimeLine,
      selectedTimeLineId
    } = this.props;
    const swapElements = (arr: any[], i: number, j: number): any[] => {
      const result =  [...arr]
      result[i] = arr[j];
      result[j] = arr[i];
      return result;
    };
    return (
      <div className={style.app}>
        <div className={style.header}>
          <span className={style.clock}><Clock /></span>
        </div>
        <h1>Selected timelines</h1>
        <div className={style.timeSelectorContainer}>
          <TimeSelector/>
          {timeLines.map((tl, index) => 
            <div key={tl.timeLineid} className={style.timeLineContainer}>
              <TimeLine timeLine={tl} />
              <div className={style.btnContainer}>
                <TimeLineControls
                  onEdit={() => { selectTimeLine(tl.timeZoneId); fillForm("editTimeLineForm", tl, false); }}
                  onDelete={() => deleteTimeLine(tl)}
                  onUp={() => replaceTimeLines(swapElements(timeLines, index, index - 1))}
                  onDown={() => replaceTimeLines(swapElements(timeLines, index, index + 1))}
                  upDisabled={!index}
                  downDisabled={index === timeLines.length - 1}
                />
              </div>
            </div>
          )}
        </div>
        <AddNewTimeline addNewTimeLine={(timeZoneId, name) => updateOrCreateTimeLine(timeZoneId, name, selectedTimeLineId)}/>
      </div>
    );
  }
}