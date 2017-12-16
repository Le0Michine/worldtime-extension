import { IconButton, Tooltip } from "material-ui";
import Slide from 'material-ui/transitions/Slide';
import MapIcon from "material-ui-icons/Map";
import Button from "material-ui/Button";
import Dialog, { DialogActions, DialogContent, DialogTitle } from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { KeyboardEvent } from "react";
import * as React from "react";
import { connect } from "react-redux";
import * as style from "./SelectTimezoneDialog.scss";

import { Suggestion } from "../../app.common/models";
import { IAppState } from "../../app.common/store";
import { WorldMap } from "./WorldMap";
import { Typeahead } from "../../app.common/components/Typeahead";

interface SelectTimezoneDialogStateProps {
  timeZones?: Suggestion[],
  useDarkTheme?: boolean;
  use24TimeFormat? : boolean;
  timeZoneId?: string;
  onChange?: (value: string) => void;
}

interface SelectTimezoneDialogDispatchProps {
}

interface SelectTimezoneDialogLineState {
  open: boolean;
  timeZoneId: string;
}

type SelectTimezoneDialogProps = SelectTimezoneDialogStateProps & SelectTimezoneDialogDispatchProps;

class SelectTimezoneDialogImpl extends React.Component<SelectTimezoneDialogProps, SelectTimezoneDialogLineState> {

  constructor(props: SelectTimezoneDialogProps) {
    super(props);

    this.state = {
      open: false,
      timeZoneId: props.timeZoneId,
    };
  }

  getDialogTransition(props) {
    return (<Slide direction="up" {...props} />);
  }

  handleClickOpen = () => {
    this.setState({ open: true, timeZoneId: this.props.timeZoneId });
  };

  handleRequestCancel = () => {
    this.setState({ open: false });
  };

  handleRequestSave = () => {
    this.setState({ open: false });
    this.props.onChange(this.state.timeZoneId);
  };

  changeTimezoneId(value: string) {
    this.setState({ timeZoneId: value });
  }

  render() {
    const {
      useDarkTheme,
      use24TimeFormat,
      timeZones,
    } = this.props;

    const { timeZoneId, open } = this.state;

    return (
      <div>
        <Tooltip title="Select on the map" placement="bottom">
          <IconButton aria-label="Map" onClick={this.handleClickOpen}>
            <MapIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          classes={{paper: style.dialogRoot}}
          open={open}
          onRequestClose={this.handleRequestCancel}
        >
          <DialogTitle>Select timezone</DialogTitle>
          <DialogContent>
            <WorldMap
              useDarkTheme={useDarkTheme}
              use24TimeFormat={use24TimeFormat}
              onSelect={(value) => this.changeTimezoneId(value)}
              timeZoneId={timeZoneId}
            />
            <Typeahead
              suggestions={timeZones}
              onChange={(value) => this.changeTimezoneId(value)}
              value={timeZoneId}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRequestSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export const SelectTimezoneDialog = connect<SelectTimezoneDialogStateProps, SelectTimezoneDialogDispatchProps, SelectTimezoneDialogProps>(
  (store: IAppState) => ({
    useDarkTheme: store.displaySettings.useDarkTheme,
    use24TimeFormat: store.displaySettings.use24HoursTime,
  }),
  {
  }
)(SelectTimezoneDialogImpl);
