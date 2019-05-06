import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    const {
      counters,
      onReset,
      onDelete,
      onIncrement,
      onDecrement
    } = this.props;

    return (
      <React.Fragment>
        <button onClick={onReset} className="btn btn-primary btn-sm m-2">
          Reset
        </button>
        <div className="container">
          {counters.map(counter => (
            <Counter
              onDelete={onDelete}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              key={counter.id}
              counter={counter}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Counters;
