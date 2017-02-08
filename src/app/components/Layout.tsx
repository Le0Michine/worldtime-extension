import * as React from "react";
import { connect } from "react-redux";

import { TimeLine, Clock } from "../../app.common/components";
import { TimeZoneInfo } from "../../app.common/models";
import { AppState } from "../../app.common/store";
const style = require("./Layout.css");

@connect((store: AppState) => {
  return { timeLines: store.timeLines } as LayoutProps;
})
export class Layout extends React.Component<any, any> {
  render(): React.ReactElement<any> {
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

interface LayoutProps {
  timeLines: any[];
}