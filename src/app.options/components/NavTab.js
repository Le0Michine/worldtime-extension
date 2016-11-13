import React from "react";

export default class Layout extends React.Component {
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