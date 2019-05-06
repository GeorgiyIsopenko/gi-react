import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends Component {
  render() {
    const { itemsPerPage, itemsCount, currentPage, onPageChanged } = this.props;

    const pagesCount = Math.ceil(itemsCount / itemsPerPage);
    const pages = _.range(1, pagesCount + 1);

    if (itemsPerPage >= itemsCount) {
      return null;
    }

    return (
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChanged(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired
};

export default Pagination;
