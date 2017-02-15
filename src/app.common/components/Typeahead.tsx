// tslint:disable:typedef
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Input } from "./Input";
const style = require("./Typeahead.css");

export class Typeahead extends React.Component<any, any> {
  constructor(props) {
    super(props);
    const { options } = this.props;
    this.state = {
      optionsContainerStyle: {
        display: "none"
      },
      optionsContainerMaxHeight: 200,
      optionsContainerMinHeight: 48,
      options,
      mouseOverList: false,
      touched: false,
      focused: false,
      activeOption: -1
    };

    setTimeout(() => this.setState({ optionsContainerStyle: this.updateOptionsPosition(true) }), 100);
  }

  static propTypes = {
    value: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  getInputRect(): ClientRect {
    // tslint:disable-next-line:no-string-literal
    return ReactDOM.findDOMNode(this.refs["typeAheadInput"]).getBoundingClientRect();
  }

  getOptionsRect(): ClientRect {
    // tslint:disable-next-line:no-string-literal
    return ReactDOM.findDOMNode(this.refs["typeAheadOptions"]).getBoundingClientRect();
  }

  updateOptionsPosition(hidden: boolean): any {
    const inputRect = this.getInputRect();
    return {
      display: hidden ? "none" : "block",
      bottom: `calc(100% - ${inputRect.top - 30}px)`,
      left: `${inputRect.left}px`,
      width: `${inputRect.width}px`,
      maxHeight: `${this.state.optionsContainerMaxHeight}px`,
      minHeight: `${this.state.optionsContainerMinHeight}px`
    };
  }

  showOptions() {
    this.setState({
      optionsContainerStyle: this.updateOptionsPosition(false),
      focused: true
    });
  }

  hideOptions(force: boolean = false): void {
    if (this.state.mouseOverList && !force) {
      return;
    }
    this.setState({
      optionsContainerStyle: {
        display: "none"
      },
      mouseOverList: false,
      focused: false
    });
  }

  isValid(): boolean {
    return !this.state.touched || !!this.props.options.find(x => x.value === this.state.inputValue);
  }

  filterOptions(query: string): void {
    const { options } = this.props;
    const regex: RegExp = new RegExp(query.replace(/[ ,/]/ig, "[ /_]"), "ig");
    const filteredOptions = options.filter(x => regex.test(x.value));
    this.setState({ options: filteredOptions, inputValue: query, touched: true });
    this.props.onChange(query);
  }

  selectOption(option) {
    this.props.onSelect(option);
    this.setState({ inputValue: option.value });
    this.hideOptions(true);
  }

  onMouseEnterOptionsList() {
    this.setState({ mouseOverList: true });
  }

  onMouseLeaveOptionsList() {
    this.setState({ mouseOverList: false });
  }

  onKeyDown(event: KeyboardEvent) {
    const KEY_UP = 38;
    const KEY_DOWN = 40;
    const KEY_ENTER = 13;
    if (event.which === KEY_UP || event.which === KEY_DOWN || event.which === KEY_ENTER) {
      event.preventDefault();
      const { activeOption, options } = this.state;
      if (activeOption === -1 && event.which === KEY_UP) {
        this.setState({ activeOption: options.length - 1 });
      } else if (activeOption === -1 && event.which === KEY_DOWN) {
        this.setState({ activeOption: 0 });
      } else if (event.which === KEY_UP) {
        this.setState({ activeOption: (options.length + activeOption - 1) % options.length });
      } else if (event.which === KEY_DOWN) {
        this.setState({ activeOption: (activeOption + 1) % options.length });
      } else if (event.which === KEY_ENTER) {
        this.selectOption(options[activeOption]);
        this.setState({ activeOption: -1 });
      }
    }
  }

  render() {
    const { value } = this.props;
    const { optionsContainerStyle, options, activeOption } = this.state;
    const isValid = this.isValid();

    return (
      <div ref="typeAheadInput">
        <div
          className={`${style.typeAheadOptions} whiteframe`}
          style={optionsContainerStyle}
          onMouseEnter={() => this.onMouseEnterOptionsList()}
          onMouseLeave={() => this.onMouseLeaveOptionsList()}
        >
          <ul className={style.typeAheadOptionsList}>
            {options.map((option, index) => (
              <li
                key={option.value}
                className={`${style.typeAheadOptionsListItem} ${activeOption === index ? style.typeAheadOptionsListItemSelected : ""}`}
                onClick={() => this.selectOption(option)}
              >
                {option.template}
              </li>
            ))}
          </ul>
        </div>
        <Input
          placeholder="Choose timezone*"
          onFocus={() => this.showOptions()}
          onBlur={() => this.hideOptions()}
          onChange={(value) => this.filterOptions(value)}
          onKeyDown={(event) => this.onKeyDown(event)}
          value={value}
          invalid={!isValid}
          errorMessage="Select value from the list, value can't be empty"
        />
      </div>
    );
  }
}