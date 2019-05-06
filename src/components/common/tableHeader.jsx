import React, { Component } from "react";
import PropTypes from "prop-types";

class TableHeader extends Component {
  raiseSort(path) {
    const { onSort, sortColumn } = this.props;

    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    onSort(sortColumn);
  }

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              onClick={() => this.raiseSort(column.path)}
              key={column.path || column.key}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  sortColumn: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired
};

export default TableHeader;
