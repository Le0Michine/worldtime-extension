import orderBy from "lodash-es/orderBy";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import * as moment from "moment-timezone";
import { KeyboardEvent } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { ActionCreator } from "redux";

import { changeDisplayName, changeTimezoneId, clearForm, createOrUpdateTimeLine } from "../../app.common/actions";
import { Typeahead } from "../../app.common/components";
import { TimeZoneInfo } from "../../app.common/models";
import { Suggestion } from "../../app.common/models/TimeZoneShort";
import { IAppState } from "../../app.common/store";
import { fromatOffset, getTimeZoneAbbreviation } from "../../app.common/util/time";
import { SelectTimezoneDialog } from "./SelectTimezoneDialog";

let compKey = 0;

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

class AddNewTimeline extends React.Component<AddNewTimeLineProps, AddNewTimeLineState> {
  constructor(props: AddNewTimeLineProps) {
    super(props);
    const tzNames = moment.tz.names().map(name => ({
      id: name,
      title: name,
      abbr: getTimeZoneAbbreviation(name),
      utcOffset: moment().tz(name).utcOffset(),
    }));
    const orderedTzNames: Suggestion[] = orderBy(tzNames, x => x.utcOffset, "asc").map(x => ({
      id: x.id,
      title: x.title + (Boolean(x.abbr) ? ` (${x.abbr})` : ""),
      subheading: `UTC${fromatOffset(x.utcOffset)}`
    } as Suggestion));
    this.state = {
      timeZones: orderedTzNames,
      displayName: "",
      selectedTimeZone: "",
      touched: false,
    };
  }

  get showError(): boolean {
    return this.state.touched && !Boolean(this.props.selectedTimeLine.name);
  }

  get addButtonDisabled(): boolean {
    const { selectedTimeLine } = this.props;
    return !selectedTimeLine.name || !selectedTimeLine.timeZoneId;
  }

  onBlur() {
    this.setState({ touched: true });
  }
  
  resetForm() {
    this.setState({ touched: false });
  }

  saveTimeLine(selectedTimeLine: TimeZoneInfo) {
    this.props.saveTimeLine(selectedTimeLine);
    this.props.clearForm();
    this.resetForm();
    compKey++;
  }

  onKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.which == 13 && !this.addButtonDisabled) {
      this.saveTimeLine(this.props.selectedTimeLine);
    }
  }

  render() {
    const {
      changeTimezoneId,
      changeDisplayName,
      selectedTimeLine,
      saveTimeLine,
      clearForm
    } = this.props;
    return (
      <div key={compKey} className="row">
        <div className="col-md-6 d-flex">
          <Typeahead
            suggestions={this.state.timeZones}
            onChange={(value) => changeTimezoneId(value)}
            value={selectedTimeLine.timeZoneId}
          />
          <SelectTimezoneDialog
            timeZones={this.state.timeZones}
            timeZoneId={selectedTimeLine.timeZoneId}
            onChange={(value) => changeTimezoneId(value)}
          />
        </div>
        <div className="col-md-4">
          <TextField
            required={true}
            label="Enter name to display"
            error={this.showError}
            fullWidth
            InputProps={{
              value: selectedTimeLine.name,
              onChange: (event) => changeDisplayName(event.target.value),
              onBlur: () => this.onBlur(),
              onKeyPress: (event) => this.onKeyPress(event),
            }}
            helperText={this.showError ? "Field can't be empty" : ""}
          />
        </div>
        <div className="col-md-2">
          <Button
            raised
            disabled={this.addButtonDisabled}
            color={Boolean(selectedTimeLine.timeLineid) ? "accent" : "primary"}
            onClick={() => this.saveTimeLine(selectedTimeLine)}
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
