import orderBy from "lodash-es/orderBy.js";
import Button from "@mui/material/Button";
import { Typeahead } from "../../app.common/components";
import { TimeZoneInfo } from "../../app.common/models";
import { Suggestion } from "../../app.common/models/TimeZoneShort";
import { SelectTimezoneDialog } from "./SelectTimezoneDialog";
import TextField from "@mui/material/TextField";
import { RootState } from "../../app.common/store";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import {
  formatOffset,
  getTimeZoneAbbreviation,
} from "../../app.common/util/time";
import { useCallback, useMemo, useState } from "react";
import {
  changeDisplayName,
  changeTzId,
  clear,
} from "../../app.common/reducers/EditTimeLineFormReducer";
import { createOrUpdateTimeline } from "../../app.common/reducers/TimeLineReducer";

let compKey = 0;

export const AddNewTimeline = () => {
  const editTimeLineForm = useSelector(
    (state: RootState) => state.editTimeLineForm.timezone,
  );
  const dispatch = useDispatch();

  const tzNames = useMemo(
    () =>
      orderBy(
        moment.tz.names().map((name) => ({
          id: name,
          title: name,
          abbr: getTimeZoneAbbreviation(name),
          utcOffset: moment().tz(name).utcOffset(),
        })),
        (x) => x.utcOffset,
        "asc",
      ).map(
        (x) =>
          ({
            id: x.id,
            title: x.title + (Boolean(x.abbr) ? ` (${x.abbr})` : ""),
            subheading: `UTC${formatOffset(x.utcOffset)}`,
          }) as Suggestion,
      ),
    [],
  );
  const [timeZones, setTimeZones] = useState(tzNames);
  const [displayName, setDisplayName] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [touched, setTouched] = useState(false);

  const resetForm = useCallback(() => {
    setTouched(false);
  }, [setTouched]);

  const onBlur = useCallback(() => {
    setTouched(true);
  }, [setTouched]);

  const saveTimeLine = useCallback(
    (selectedTimeLine: TimeZoneInfo) => {
      dispatch(createOrUpdateTimeline(selectedTimeLine));
      clear();
      resetForm();
      compKey++;
    },
    [dispatch],
  );

  const onKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.which == 13 && !addButtonDisabled) {
        saveTimeLine(editTimeLineForm);
      }
    },
    [saveTimeLine],
  );

  const showError = useMemo(
    () => touched && !Boolean(editTimeLineForm.name),
    [touched, editTimeLineForm.name],
  );
  const addButtonDisabled = useMemo(() => {
    return !editTimeLineForm.name || !editTimeLineForm.timeZoneId;
  }, [touched, editTimeLineForm.name, editTimeLineForm.timeZoneId]);

  return (
    <div key={compKey} className="row">
      <div className="col-md-6 d-flex">
        <Typeahead
          suggestions={timeZones}
          onChange={(value) => dispatch(changeTzId(value))}
          value={editTimeLineForm.timeZoneId}
        />
        <SelectTimezoneDialog
          timeZones={timeZones}
          timeZoneId={editTimeLineForm.timeZoneId}
          onChange={(value) => dispatch(changeTzId(value))}
        />
      </div>
      <div className="col-md-4">
        <TextField
          size="small"
          required={true}
          label="Enter name to display"
          error={showError}
          fullWidth
          InputProps={{
            value: editTimeLineForm.name,
            onChange: (event) =>
              dispatch(changeDisplayName(event.target.value)),
            onBlur,
            onKeyPress,
          }}
          helperText={showError ? "Field can't be empty" : ""}
        />
      </div>
      <div className="col-md-2">
        <Button
          disabled={addButtonDisabled}
          variant={
            Boolean(editTimeLineForm.timeLineId) ? "outlined" : "contained"
          }
          onClick={() => saveTimeLine(editTimeLineForm)}
        >
          {editTimeLineForm.timeLineId >= 0 ? "Save" : "Add"}
        </Button>
      </div>
    </div>
  );
};
