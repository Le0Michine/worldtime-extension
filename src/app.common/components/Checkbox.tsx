import * as React from "react";

interface CheckboxProps {
  value: boolean,
  onChange: Function
}

interface CheckboxState {
  value: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || false
    };
  }

  onChange(value: boolean) {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div className={`checkbox-material-container ${value ? "checkbox-material-checked" : ""}`} onClick={() => this.onChange(!value)}>
        <div className="checkbox-material">
          <div className={`checkbox-material-icon`}></div>
        </div>
      </div>
    );
  }
}