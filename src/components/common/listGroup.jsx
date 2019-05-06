import React, { Component } from "react";
import PropTypes from "prop-types";

class ListGroup extends Component {
  render() {
    const {
      items,
      onItemSelect,
      selectedItem,
      textProperty,
      valueProperty
    } = this.props;

    return (
      <ul className="list-group">
        {items.map(item => (
          <li
            key={item[valueProperty]} // In case Id is missing.
            onClick={() => onItemSelect(item)}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func.isRequired
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
