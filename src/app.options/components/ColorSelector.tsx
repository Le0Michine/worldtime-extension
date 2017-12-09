import { FormControl } from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import * as React from "react";

import { ColorId, ColorName, getColorNames, getDefaultColorById } from "../../app.common/themes/themes";

interface ColorSelectorProps {
  id: string;
  label: string;
  color: ColorName,
  onChange: (color: ColorName) => void,
}

export class ColorSelector extends React.Component<ColorSelectorProps, any> {

  private colors = getColorNames();

  onChange(colorId: ColorId) {
    this.props.onChange(this.colors.find(x => x.id === colorId))
  }

  renderColorMenuItem(color: ColorName) {
    return (
      <MenuItem key={color.id} value={color.id} style={{ textTransform: "capitalize" }}>
        <span>{color.name}</span>
        {this.renderColorSample(color)}
      </MenuItem>
    );
  }

  renderColorSample(color: ColorName) {
    return (
      <span className="ml-auto" style={{
        width: 20,
        height: 20,
        marginTop: 6,
        marginBottom: 6,
        borderRadius: 100000,
        background: getDefaultColorById(color.id)
      }}></span>
    );
  }

  renderColorValue(id: ColorId, color: ColorName) {
    return (
      <div className="d-flex">
        <span>{color.name}</span>
        {this.renderColorSample(color)}
      </div>
    );
  }

  render() {
    const { color, id, label } = this.props;

    const colors = getColorNames();

    return (
      <FormControl fullWidth>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          style={{ textTransform: "capitalize" }}
          value={color.id}
          renderValue={(x) => this.renderColorValue(x, color)}
          onChange={(event) => this.onChange(event.target.value as ColorId)}
          input={<Input name={id} id={id} />}
        >
          {colors.map(x => this.renderColorMenuItem(x))}
        </Select>
      </FormControl>
    );
  }
}
