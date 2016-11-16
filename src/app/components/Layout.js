import React from "react";
import { connect } from "react-redux";

import { TimeLine, Clock } from "../../app.common/components";
import { TimeZoneInfo } from "../../app.common/models";
import style from "./Layout.css";

@connect((store) => {
  return { timeLines: store.timeLines };
})
export default class Layout extends React.Component {
  render() {
    return (
      <div className={style.app}>
        <div className={style.header}>
          <span className={style.clock}><Clock /></span>
          <a className={style.settingsBtn + " material-icons"} target="_blank" href="options.html">settings</a>
        </div>
        <div>
          {this.props.timeLines.map(tl => 
            <TimeLine key={tl.name} timeLine={tl} />
          )}
        </div>
      </div>
    );
  }
}