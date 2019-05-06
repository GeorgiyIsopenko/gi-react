import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
  render() {
    const { movies, onLike, onDelete, onSort, sortColumn } = this.props;

    const columns = [
      { path: "title", label: "Title" },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: movie => (
          <Like onLikeToggle={() => onLike(movie)} isLiked={movie.isLiked} />
        )
      },
      {
        key: "delete",
        content: movie => (
          <button
            onClick={() => {
              onDelete(movie);
            }}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )
      }
    ];

    return (
      <table className="table">
        <TableHeader
          sortColumn={sortColumn}
          onSort={onSort}
          columns={columns}
        />
        <TableBody data={movies} columns={columns} />
      </table>
    );
  }
}

export default MoviesTable;
