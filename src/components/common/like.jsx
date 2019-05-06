import React, { Component } from "react";

class Like extends Component {
  render() {
    const { onLikeToggle, isLiked } = this.props;

    return (
      <i
        onClick={onLikeToggle}
        style={{ cursor: "pointer" }}
        className={this.getIconClasses(isLiked)}
        aria-hidden="true"
      />
    );
  }
  getIconClasses(isLiked) {
    const classes = "fa fa-heart";
    return isLiked ? classes : classes + "-o";
  }
}

export default Like;
