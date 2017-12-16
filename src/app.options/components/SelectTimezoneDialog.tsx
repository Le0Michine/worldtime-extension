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
      timeZoneId: "",
    };
  }

  getDialogTransition(props) {
    return (<Slide direction="up" {...props} />);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  changeTimezoneId(value: string) {
    console.log("change tz", value);
    this.setState({ timeZoneId: value });
  }

  render() {
    const {
      useDarkTheme,
      use24TimeFormat,
    } = this.props;

    return (
      <div>
        <Tooltip title="Select on the map" placement="bottom">
          <IconButton aria-label="Map" onClick={this.handleClickOpen}>
            <MapIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          classes={{paper: style.dialogRoot}}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>Select timezone</DialogTitle>
          <DialogContent>
            <WorldMap useDarkTheme={useDarkTheme} use24TimeFormat={use24TimeFormat} />
            <Typeahead
              suggestions={this.props.timeZones}
              onChange={(value) => this.changeTimezoneId(value)}
              value={this.state.timeZoneId}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
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
