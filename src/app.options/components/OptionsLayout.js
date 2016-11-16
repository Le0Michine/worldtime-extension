import React from "react";
import { Link, IndexLink } from "react-router";
import { connect } from "react-redux";

import { TimeLine, Clock } from "../../app.common/components";
import NavTab from "./NavTab";
import { TimeZoneInfo } from "../../app.common/models";
import style from "./OptionsLayout.css";
import * as timeLines from "../../app.common/actions";

@connect((store) => {
  return { timeLines: store.timeLines };
})
export default class OptionsLayout extends React.Component {
  onNewTimeLine({name, timeZoneName, timeZoneOffset}) {
    this.props.dispatch(timeLines.addTimeLine(new TimeZoneInfo(name, timeZoneName, +timeZoneOffset)));
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
            <TimeLine key={tl.name} timeLine={tl} />
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