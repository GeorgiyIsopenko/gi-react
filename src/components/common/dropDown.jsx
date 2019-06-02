import React, { Component } from "react";

class DropDown extends Component {
  render() {
    const { name, label, error, items, ...rest } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          {...rest}
          className="custom-select form-control"
          name={name}
          id={name}
        >
          <option defaultValue="" />
          {items.map(item => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default DropDown;
