import * as React from "react";

interface InputProps {
  value?: string;
  invalid?: boolean;
  errorMessage?: string;
  placeholder?: string;
  onChange?: Function;
  onTouch?: Function;
  onFocus?: Function;
  onBlur?: Function;
  onKeyDown?: Function;
}

interface InputState {
  touched: boolean;
  focused: boolean;
}

export class Input extends React.Component<InputProps, InputState> {
  constructor(props) {
    super(props);
    this.state = {
      touched: false,
      focused: false
    };
  }

  static propTypes = {
    value: React.PropTypes.string.isRequired,
    errorMessage: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    invalid: React.PropTypes.bool,
    onTouch: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
  };

  onFocus() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    this.setState({ focused: true });
  }

  onBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.setState({ focused: false });
  }

  onChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    this.setState({ touched: true });
  }

  onKeyDown(event) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  render() {
    const { invalid, placeholder, value, errorMessage } = this.props;
    const { focused, touched } = this.state;
    const inputContainerClasses =
      "input-container " +
      `${ focused ? "input-container-focused " : "" }` +
      `${ !!value ? "input-has-value " : "" }` +
      `${ invalid && touched ? "input-container-invalid " : "" }`;

    return (
      <div className={inputContainerClasses}>
        <label>{placeholder}</label>
        <input
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          onChange={(event) => this.onChange(event.target.value)}
          onKeyDown={(event) => this.onKeyDown(event)}
          value={value}
          type="text" />
        <div className="input-invalid-error-message">{errorMessage}</div>
      </div>
    );
  }
}