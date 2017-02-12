import * as React from "react";
import { connect, ActionCreator } from "react-redux";
import * as moment from "moment-timezone";

import { TimeZoneInfo } from "../../app.common/models";
import { Typeahead, Input } from "../../app.common/components";
const style = require("./AddNewTimeline.css");

// @connect(
//   store => ({
//     initialValues: { fetchedTimeLines: {} }
//   }),
//   {
//     fetchTimeLine: fetchTimeLine as ActionCreator<any>
//   }
// )
export default class AddNewTimeline extends React.Component<any, any> {
  constructor(props) {
    super(props);
    const tzNames = moment.tz.names().map(name => ({ id: name, utcOffset: moment().tz(name).utcOffset() }));
    this.state = {
      tzNames,
      allTzNames: tzNames,
      displayName: "",
      selectedTimeZone: ""
    };
  }

  getOptionItem(tz) {
    const offset = (tz.utcOffset >= 0 ? "+" : "") + tz.utcOffset / 60;
    return {
      value: tz.id,
      template: (<div className={style.optionItem} key={tz.id}><span className={style.textLeft}>{tz.id.replace("_", " ")}</span> <i className={style.textRight}>UTC{offset}</i></div>)
    };
  }

  selectTimeZone(timeZone) {
    const displayName = this.state.displayName || timeZone;
    this.setState({ selectedTimeZone: timeZone, displayName });
  }

  onTimeZoneChange(timeZone) {
    this.setState({ selectedTimeZone: timeZone });
  }

  onDisplayNameChange(value) {
    this.setState({ displayName: value });
  }

  addNewTimeLine(selectedTimeZone, displayName) {
    this.setState({ selectedTimeZone: "", displayName: "" });
    this.props.addNewTimeLine(selectedTimeZone, displayName);
    compKey++;
  }

  render() {
    const { fetchTimeLine } = this.props;
    const { displayName, selectedTimeZone } = this.state;
    const addButtonDisabled = !displayName || !selectedTimeZone;
    return (
      <div key={compKey} className="row">
        <div className="col-md-12"><h1>Add a new timeline</h1></div>
        <div className="col-md-5">
          <Typeahead
            options={this.state.tzNames.map(tz => this.getOptionItem(tz))}
            onSelect={(option) => this.selectTimeZone(option.value)}
            onChange={(value) => this.onTimeZoneChange(value)}
            value={selectedTimeZone}
          />
        </div>
        <div className="col-md-5">
          <Input
            value={displayName}
            onChange={(value) => this.onDisplayNameChange(value)}
            placeholder={"Enter name to display*"}
            invalid={!displayName}
            errorMessage="Field can't be empty"
          />
        </div>
        <div className="col-md-2">
          <button className={`btn btn-default btn-material ${ addButtonDisabled ? "disabled" : "" }`} onClick={() => this.addNewTimeLine(selectedTimeZone, displayName)}>Add</button>
        </div>
      </div>
    );
  }
}

var compKey = 0;