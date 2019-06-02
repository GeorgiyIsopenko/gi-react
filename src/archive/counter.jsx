import React, { Component } from "react";

class Counter extends Component {
  render() {
    const { counter, onDelete, onIncrement, onDecrement } = this.props;

    return (
      <div className="row">
        <div className="col-1">
          <span className={this.getBadgeClasses(counter)}>
            {this.formatCount(counter)}
          </span>
        </div>

        <div className="col">
          <button
            onClick={() => onIncrement(counter)}
            className="btn btn-secondary btn-sml"
          >
            +
          </button>
          <button
            onClick={() => onDecrement(counter)}
            className={"btn btn-secondary btn-sml m-2"}
            disabled={this.props.counter.value === 0 ? "disabled" : ""}
          >
            -
          </button>
          <button
            onClick={() => onDelete(counter.id)}
            className="btn btn-danger btn-sml"
          >
            x
          </button>
        </div>
      </div>
    );
  }
  getBadgeClasses(counter) {
    let classes = "badge m-2 badge-";
    classes += counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount(counter) {
    const { value } = counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
