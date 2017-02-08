import * as React from "react";

export class NavTab extends React.Component<any, any> {
  render() {
    var className = "";
    if (this.props.active) {
      className = "active";
    }
    return (
      <li className={className}>{this.props.title}</li>
    );
  }
}