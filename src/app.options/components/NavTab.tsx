import React from "react";

export class NavTab extends React.Component<any, any> {
  render() {
    const {active, disabled, title} = this.props;
    const className = `${active ? "active" : ""} ${disabled ? "disabled" : ""}`;
    return (
      <li className={className}>{title}</li>
    );
  }
}