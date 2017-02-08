import * as React from "react";
import { Link, IndexLink } from "react-router";
import { connect, ActionCreator } from "react-redux";
import { bindActionCreators } from "redux";
import { initialize } from "redux-form";

import { TimeLine, Clock, TimeSelector } from "../../app.common/components";
import { DeleteEditButtons } from "./DeleteEditButtons";
import { NavTab } from "./NavTab";
import { TimeZoneInfo, createTimeZoneInfo } from "../../app.common/models";
import { AppState, AppStoreDispatcher } from "../../app.common/store";
import { removeTimeLine, addTimeLine, selectTimeLine, createOrUpdateTimeLine } from "../../app.common/actions";
const style = require("./OptionsLayout.css");

interface OptionsLayoutDispatchProps {
  updateOrCreate: ActionCreator<any>;
  delete: ActionCreator<any>;
  select: ActionCreator<any>;
  fillForm: ActionCreator<any>;
}

interface OptionsLayoutStateProps {
  router?: any;
  children?: any;
  timeLines: TimeZoneInfo[];
  isEditMode: boolean;
}

type OptionsLayoutProps = OptionsLayoutStateProps & OptionsLayoutDispatchProps;

@connect<OptionsLayoutStateProps, OptionsLayoutDispatchProps, OptionsLayoutProps>(
  state => ({
    timeLines: state.timeLines,
    isEditMode: state.selectedTimeLineId ? true : false
  } as OptionsLayoutStateProps),
  {
    updateOrCreate: createOrUpdateTimeLine as ActionCreator<any>,
    delete: removeTimeLine as ActionCreator<any>,
    select: selectTimeLine as ActionCreator<any>,
    fillForm: initialize as ActionCreator<any>
  }
)
export default class OptionsLayout extends React.Component<OptionsLayoutProps, React.ComponentState> {
  render() {
    const onMouseMove = (event) => {
      console.info("move", event);
      
    };
    const { router, timeLines } = this.props;
    return (
      <div className={style.app}>
        <div className={style.header}>
          <span className={style.clock}><Clock /></span>
        </div>
        <h1>Selected timelines</h1>
        <div className={style.timeSelectorContainer} onMouseMove={onMouseMove}>
          <TimeSelector/>
          {timeLines.map(tl => 
            <div key={tl.id} className={style.timeLineContainer}>
              <TimeLine timeLine={tl} />
              <div className={style.btnContainer}>
                <DeleteEditButtons
                  onEdit={() => { this.props.select(tl.id); this.props.fillForm("editTimeLineForm", tl, false); }}
                  onDelete={() => this.props.delete(tl)}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <h1>Add a new timeline</h1>
          <div>
            <ul className="nav nav-tabs">
              <NavTab active={!router.isActive("timelines")} title={<Link to="/">Manually</Link>} />
              <NavTab active={router.isActive("timelines")} title={<Link to="timelines">Select predefined</Link>} />
            </ul>
          </div>
          {this.props.children && React.cloneElement(this.props.children, { onSubmit: this.props.updateOrCreate.bind(this) })}
          {/*{this.props.children && React.cloneElement(this.props.children)}*/}
        </div>
      </div>
    );
  }
}