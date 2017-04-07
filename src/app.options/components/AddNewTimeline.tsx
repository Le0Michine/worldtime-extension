import * as React from "react";
import { connect, ActionCreator } from "react-redux";
import * as moment from "moment-timezone";

import { TimeZoneInfo } from "../../app.common/models";
import { Typeahead, Input } from "../../app.common/components";
import { changeDisplayName, changeTimezoneId, createOrUpdateTimeLine, clearForm } from "../../app.common/actions";
import { IAppState } from "../../app.common/store";
const style = require("./AddNewTimeline.css");

interface AddNewTimeLineStateProps {
  selectedTimeLine?: TimeZoneInfo;
}

interface AddNewTimeLineDispatchProps {
  changeDisplayName?: Function;
  changeTimezoneId?: Function;
  saveTimeLine?: Function;
  clearForm?: Function;
}

type AddNewTimeLineProps = AddNewTimeLineStateProps & AddNewTimeLineDispatchProps;

var compKey: number = 0;

@connect<AddNewTimeLineStateProps, AddNewTimeLineDispatchProps, AddNewTimeLineProps>(
  (store: IAppState) => ({
    selectedTimeLine: store.editTimeLineForm
  }),
  {
    changeDisplayName: changeDisplayName as ActionCreator<any>,
    changeTimezoneId: changeTimezoneId as ActionCreator<any>,
    saveTimeLine: createOrUpdateTimeLine as ActionCreator<any>,
    clearForm: clearForm as ActionCreator<any>
  }
)
export default class AddNewTimeline extends React.Component<AddNewTimeLineProps, any> {
  constructor(props: AddNewTimeLineProps) {
    super(props);
    const tzNames = moment.tz.names().map(name => ({ id: name, utcOffset: moment().tz(name).utcOffset() }));
    this.state = {
      tzNames,
      allTzNames: tzNames,
      displayName: "",
      selectedTimeZone: ""
    };
  }

  // addNewTimeLine(selectedTimeZone, displayName) {
  //   this.setState({ selectedTimeZone: "", displayName: "" });
  //   this.props.addNewTimeLine(selectedTimeZone, displayName);
  //   compKey++;
  // }

  render(): any {
    const { changeTimezoneId, changeDisplayName, selectedTimeLine, saveTimeLine, clearForm } = this.props;
    const addButtonDisabled = !selectedTimeLine.name || !selectedTimeLine.timeZoneId;
    return (
      <div key={compKey} className="row">
        <div className="col-md-12"><h1>Add a new timeline</h1></div>
        <div className="col-md-5">
          <Typeahead
            options={this.state.tzNames.map(tz => getOptionItem(tz))}
            onSelect={(option) => changeTimezoneId(option.value)}
            onChange={(value) => changeTimezoneId(value)}
            value={selectedTimeLine.timeZoneId}
          />
        </div>
        <div className="col-md-5">
          <Input
            value={selectedTimeLine.name}
            onChange={(value) => changeDisplayName(value)}
            placeholder={"Enter name to display*"}
            invalid={!selectedTimeLine.name}
            errorMessage="Field can't be empty"
          />
        </div>
        <div className="col-md-2">
          <button
            // tslint:disable-next-line:max-line-length
            className={`btn btn-default btn-material ${ addButtonDisabled ? "disabled" : ""} ${selectedTimeLine.timeLineid ? "btn-material-edit" : ""}`}
            onClick={() => { saveTimeLine(selectedTimeLine); clearForm(); compKey++;}}
          >{selectedTimeLine.timeLineid ? "Save" : "Add"}</button>
        </div>
      </div>
    );
  }
}

function getOptionItem(tz): any {
  const offset: string = (tz.utcOffset >= 0 ? "+" : "") + tz.utcOffset / 60;
  return {
    value: tz.id,
    // tslint:disable-next-line:max-line-length
    template: (<div className={style.optionItem} key={tz.id}><span className={style.textLeft}>{tz.id.replace("_", " ")}</span> <i className={style.textRight}>UTC{offset}</i></div>)
  };
}