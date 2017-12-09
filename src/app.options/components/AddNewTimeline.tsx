import { Suggestion } from "../../app.common/models/TimeZoneShort";
import * as React from "react";
import { connect, ActionCreator } from "react-redux";
import * as moment from "moment-timezone";
import * as _ from "lodash";
import Button from "material-ui/Button";
import { MenuItem } from "material-ui/Menu";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl, FormHelperText } from "material-ui/Form";

import { TimeZoneInfo } from "../../app.common/models";
import { Typeahead } from "../../app.common/components";
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

interface AddNewTimeLineState {
  timeZones: Suggestion[],
  displayName: string,
  selectedTimeZone: string,
  touched: boolean,
}

type AddNewTimeLineProps = AddNewTimeLineStateProps & AddNewTimeLineDispatchProps;

var compKey: number = 0;

class AddNewTimeline extends React.Component<AddNewTimeLineProps, AddNewTimeLineState> {
  constructor(props: AddNewTimeLineProps) {
    super(props);
    const tzNames: Suggestion[] = _.chain(moment.tz.names()).map(name => ({
      id: name,
      title: name,
      utcOffset: moment().tz(name).utcOffset(),
    })).orderBy(x => x.utcOffset, "asc").map(x => ({
      id: x.id,
      title: x.title,
      subheading: `UTC${x.utcOffset > 0 ? "+" : "-"}${Math.abs(x.utcOffset / 60)}`
    } as Suggestion)).value();
    this.state = {
      timeZones: tzNames,
      displayName: "",
      selectedTimeZone: "",
      touched: false,
    };
  }

  get showError(): boolean {
    return this.state.touched && !Boolean(this.props.selectedTimeLine.name);
  }

  onBlur() {
    this.setState({ touched: true });
  }

  render() {
    const { changeTimezoneId, changeDisplayName, selectedTimeLine, saveTimeLine, clearForm } = this.props;
    const addButtonDisabled = !selectedTimeLine.name || !selectedTimeLine.timeZoneId;
    return (
      <div key={compKey} className="row">
        <div className="col-md-5">
          <Typeahead
            suggestions={this.state.timeZones}
            onChange={(value) => changeTimezoneId(value)}
            value={selectedTimeLine.timeZoneId}
          />
        </div>
        <div className="col-md-5">
          <TextField
            required={true}
            label="Enter name to display"
            error={this.showError}
            fullWidth
            InputProps={{
              value: selectedTimeLine.name,
              onChange: (event) => changeDisplayName(event.target.value),
              onBlur: () => this.onBlur(),
            }}
            helperText={this.showError ? "Field can't be empty" : ""}
          />
        </div>
        <div className="col-md-2">
          <Button
            raised
            disabled={addButtonDisabled}
            color={Boolean(selectedTimeLine.timeLineid) ? "accent" : "primary"}
            onClick={() => {
              saveTimeLine(selectedTimeLine);
              clearForm();
              compKey++;
            }}
          >{selectedTimeLine.timeLineid ? "Save" : "Add"}</Button>
        </div>
      </div>
    );
  }
}

export default connect<AddNewTimeLineStateProps, AddNewTimeLineDispatchProps, AddNewTimeLineProps>(
  (store: IAppState) => ({
    selectedTimeLine: store.editTimeLineForm
  }),
  {
    changeDisplayName: changeDisplayName as ActionCreator<any>,
    changeTimezoneId: changeTimezoneId as ActionCreator<any>,
    saveTimeLine: createOrUpdateTimeLine as ActionCreator<any>,
    clearForm: clearForm as ActionCreator<any>
  }
)(AddNewTimeline);
