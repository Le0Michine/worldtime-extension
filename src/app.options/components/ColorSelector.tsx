import React, { useCallback, useMemo } from "react";

import {
  ColorId,
  ColorName,
  getColorNames,
  getDefaultColorById,
} from "../../app.common/themes/themes";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";

interface ColorSelectorProps {
  id: string;
  label: string;
  color: ColorName;
  onChange: (color: ColorName) => void;
}

export const ColorSelector = (props: ColorSelectorProps) => {
  const colors = useMemo(() => getColorNames(), []);

  const onChange = useCallback(
    (colorId: ColorId) => {
      props.onChange(colors.find((x) => x.id === colorId));
    },
    [props.onChange],
  );

  const renderColorSample = useCallback((color: ColorName) => {
    return (
      <span
        className="ml-auto"
        style={{
          width: 20,
          height: 20,
          marginTop: 6,
          marginBottom: 6,
          borderRadius: 100000,
          background: getDefaultColorById(color.id),
        }}
      ></span>
    );
  }, []);

  const renderColorMenuItem = useCallback(
    (color: ColorName) => {
      return (
        <MenuItem
          key={color.id}
          value={color.id}
          style={{ textTransform: "capitalize" }}
        >
          <span>{color.name}</span>
          {renderColorSample(color)}
        </MenuItem>
      );
    },
    [renderColorSample],
  );

  const renderColorValue = useCallback(
    (id: ColorId, color: ColorName) => {
      return (
        <div className="d-flex">
          <span>{color.name}</span>
          {renderColorSample(color)}
        </div>
      );
    },
    [renderColorSample],
  );
  const { color, id, label } = props;

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        style={{ textTransform: "capitalize" }}
        value={color.id}
        renderValue={(x: ColorId) => renderColorValue(x, color)}
        onChange={(event) => onChange(event.target.value as ColorId)}
        input={<Input name={id} id={id} />}
      >
        {colors.map((x) => renderColorMenuItem(x))}
      </Select>
    </FormControl>
  );
};
