import MapIcon from "@mui/icons-material/Map";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Suggestion } from "../../app.common/models/index.js";
import { RootState } from "../../app.common/store.js";
import { WorldMap } from "./WorldMap.js";
import { Typeahead } from "../../app.common/components/Typeahead.js";

import style from "./SelectTimezoneDialog.module.scss";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

interface SelectTimezoneDialogStateProps {
  timeZones?: Suggestion[];
  useDarkTheme?: boolean;
  use24TimeFormat?: boolean;
  timeZoneId?: string;
  onChange?: (value: string) => void;
}

interface SelectTimezoneDialogDispatchProps {}

interface SelectTimezoneDialogLineState {
  open: boolean;
  timeZoneId: string;
}

type SelectTimezoneDialogProps = SelectTimezoneDialogStateProps &
  SelectTimezoneDialogDispatchProps;

export const SelectTimezoneDialog = (props: SelectTimezoneDialogProps) => {
  useDispatch();
  const displaySettings = useSelector(
    (state: RootState) => state.displaySettings,
  );
  const [open, setOpen] = useState(false);
  const [timeZoneId, setTimeZoneId] = useState(props.timeZoneId);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
    setTimeZoneId(props.timeZoneId);
  }, []);

  const handleRequestCancel = useCallback(() => {
    (document.activeElement as any)?.blur?.();
    setOpen(false);
  }, []);

  const handleRequestSave = useCallback(() => {
    (document.activeElement as any)?.blur?.();
    setOpen(false);
    props.onChange(timeZoneId);
  }, [timeZoneId]);

  const changeTimezoneId = useCallback(
    (value: string) => {
      setTimeZoneId(value);
    },
    [setTimeZoneId],
  );

  const { use24HoursTime } = displaySettings;
  const { timeZones } = props;

  return (
    <div>
      <Tooltip title="Select on the map" placement="bottom">
        <IconButton aria-label="Map" size="medium" onClick={handleClickOpen}>
          <MapIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        classes={{ paper: style.dialogRoot }}
        open={open}
        onClose={handleRequestCancel}
      >
        <DialogTitle>Select timezone</DialogTitle>
        <DialogContent className="pb-0">
          <WorldMap
            use24TimeFormat={use24HoursTime}
            onSelect={changeTimezoneId}
            timeZoneId={timeZoneId}
          />
          <div className="mt-4">
            <Typeahead
              suggestions={timeZones}
              onChange={changeTimezoneId}
              value={timeZoneId}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRequestSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
