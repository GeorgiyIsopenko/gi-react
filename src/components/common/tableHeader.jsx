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
  renderSortIcon = column => {
    const { path, order } = this.props.sortColumn;
    const className = "fa fa-sort-";

    if (column.path !== path) return null;
    return order === "asc" ? (
      <i className={className + "asc"} />
    ) : (
      <i className={className + "desc"} />
    );
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              onClick={() => this.raiseSort(column.path)}
              key={column.path || column.key}
              className="clickable"
            >
              {column.label} {this.renderSortIcon(column)}
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
