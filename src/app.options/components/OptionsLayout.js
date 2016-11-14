import React from "react";
import { Link, IndexLink } from "react-router";
import { connect } from "react-redux";

import TimeLine from "../../app/components/TimeLine";
import NavTab from "./NavTab";
import { TimeZoneInfo } from "../models";
import style from "./OptionsLayout.css";
import * as timeLines from "../actions/TimeLineActions";

@connect((store) => {
  return { timeLines: store.timeLines };
})
export default class OptionsLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      time: this.getTimeString(Date.now())
    };
    setInterval(() => this.updateTime(Date.now()), 1000);
  }

  getTimeString(unixTime) {
    const date = new Date(unixTime);
    return date.toLocaleTimeString();
  }

  updateTime(unixTime) {
    const time = this.getTimeString(unixTime);
    this.setState({time});
  }

  onNewTimeLine({name, timeZoneName, timeZoneOffset}) {
    this.props.dispatch(timeLines.addTimeLine(new TimeZoneInfo(name, timeZoneName, +timeZoneOffset)));
  }

  render() {
    const { router, timeLines } = this.props;
    return (
      <div className={style.app}>
        <div className={style.header}>
          <div className={style.clock}>{this.state.time}</div>
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