import * as React from "react";

export class NavTab extends React.Component<any, any> {
  static propTypes = {
    title: React.PropTypes.element.isRequired,
    active: React.PropTypes.bool.isRequired,
    disabled: React.PropTypes.bool
  };

  render() {
    const {active, disabled, title} = this.props;
    const className = `${active ? "active" : ""} ${disabled ? "disabled" : ""}`;
    return (
      <li className={className}>{title}</li>
    );
  }
}