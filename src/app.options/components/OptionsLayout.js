import React from "react";
import { Link, IndexLink } from "react-router";
import { connect } from "react-redux";
import { initialize } from "redux-form";

import { TimeLine, Clock } from "../../app.common/components";
import DeleteEditButtons from "./DeleteEditButtons";
import NavTab from "./NavTab";
import { TimeZoneInfo, createTimeZoneInfo } from "../../app.common/models";
import style from "./OptionsLayout.css";
import { removeTimeLine, addTimeLine, select, editTimeLine } from "../../app.common/actions";

@connect(
  store => ({ 
    timeLines: store.timeLines,
    isEditMode: store.selectedTimeLineId ? true : false
  }),
  {
    update: editTimeLine,
    create: addTimeLine,
    delete: removeTimeLine,
    select,
    fillForm: initialize
  }
)
export default class OptionsLayout extends React.Component {
  onNewTimeLine({id, name, timeZoneName, timeZoneOffset}) {
    let newTimeZoneInfo = createTimeZoneInfo(name, timeZoneName, +timeZoneOffset, id);
    if (this.props.timeLines.findIndex(x => x.id === id) > -1) {
      this.props.update(newTimeZoneInfo);
    } else {
      this.props.create(newTimeZoneInfo);
    }
    this.props.fillForm("editTimeLineForm", {}, false);
  }

  onDelete(timeLine) {
    return function() { this.props.delete(timeLine); }
  }

  onEdit(timeLine) {
    return function() {
      this.props.select(timeLine.id);
      this.props.fillForm("editTimeLineForm", timeLine, false);
    };
  }

  render() {
    const { router, timeLines } = this.props;
    return (
      <div className={style.app}>
        <div className={style.header}>
          <span className={style.clock}><Clock /></span>
        </div>
        <h1>Selected timelines</h1>
        <div>
          {timeLines.map(tl => 
            <div key={tl.id}>
              <TimeLine timeLine={tl} />
              <div className={style.btnContainer}>
                <DeleteEditButtons
                  onEdit={this.onEdit(tl).bind(this)}
                  onDelete={this.onDelete(tl).bind(this)}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <h1>Add a new timeline</h1>
          <div>
            <ul class="nav nav-tabs">
              <NavTab active={!router.isActive("timelines")} title={<Link to="/">Manually</Link>} />
              <NavTab active={router.isActive("timelines")} title={<Link to="timelines">Select predefined</Link>} />
            </ul>
          </div>
          {this.props.children && React.cloneElement(this.props.children, { onSubmit: this.onNewTimeLine.bind(this) })}
        </div>
      </div>
    );
  }
}