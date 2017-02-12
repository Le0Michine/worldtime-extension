import * as React from "react";
import * as ReactDOM from "react-dom";
import * as moment from "moment";
const style = require("./Typeahead.css");

import { TimeZoneInfo } from "../models";
import { Input } from "./Input";

export class Typeahead extends React.Component<any, any> {
  constructor(props) {
    super(props);
    const { options } = this.props;
    this.state = {
      optionsContainerStyle: { display: "none" },
      optionsContainerHeight: 200,
      options,
      mouseOverList: false,
      touched: false,
      focused: false
    };
  }

  static propTypes = {
    value: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  getInputRect() {
    return ReactDOM.findDOMNode(this.refs["typeAheadInput"]).getBoundingClientRect()
  }

  showOptions() {
    const rect = this.getInputRect();
    this.setState({
      optionsContainerStyle: {
        display: "block",
        top: `${rect.top - this.state.optionsContainerHeight - 30}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${this.state.optionsContainerHeight}px`
      },
      focused: true
    });
  }

  hideOptions(force: boolean = false) {
    if (this.state.mouseOverList && !force) return;
    const rect = this.getInputRect();
    this.setState({
      optionsContainerStyle: {
        display: "none"
      },
      mouseOverList: false,
      focused: false
    });
  }

  isValid() {
    return !this.state.touched || !!this.props.options.find(x => x.value === this.state.inputValue);
  }

  filterOptions(query: string) {
    const { options } = this.props;
    const regex = new RegExp(query.replace(/[ ,/]/ig, "[ /_]"), "ig");
    const filteredOptions = options.filter(x => regex.test(x.value));
    this.setState({ options: filteredOptions, inputValue: query, touched: true });
    this.props.onChange(query);
  }

  selectOption(option) {
    this.props.onSelect(option);
    this.setState({ inputValue: option.value })
    this.hideOptions(true);
  }

  onMouseEnterOptionsList() {
    this.setState({ mouseOverList: true });
  }

  onMouseLeaveOptionsList() {
    this.setState({ mouseOverList: false });
  }

  render() {
    const { value } = this.props;
    const { optionsContainerStyle, options, focused } = this.state;
    const isValid = this.isValid();

    return (
      <div ref="typeAheadInput">
        <div className={`${style.typeAheadOptions} whiteframe`} style={optionsContainerStyle} onMouseEnter={() => this.onMouseEnterOptionsList()} onMouseLeave={() => this.onMouseLeaveOptionsList()}>
          <ul className={style.typeAheadOptionsList}>
            {options.map(option => (
              <li key={option.value} className={style.typeAheadOptionsListItem} onClick={() => this.selectOption(option)}>
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
          value={value}
          invalid={!isValid}
          errorMessage="Select value from the list, value can't be empty"
        />
      </div>
    );
  }
}