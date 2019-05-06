import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    itemsPerPage: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ _id: "", name: "All Genre" }, ...getGenres()]
    });
  }

  handleDeleteEvent = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({
      movies
    });
  };

  handleLikeEvent = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].isLiked = !movies[index].isLiked;
    this.setState({
      movies
    });
  };

  handlePageChange = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handelSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      itemsPerPage,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const moviesCount = sortedMovies.length;
    const movies = paginate(sortedMovies, itemsPerPage, currentPage);

    if (moviesCount === 0)
      return (
        <p className="movies-header">There are no movies in the database.</p>
      );

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>

        <div className="col">
          <p>Showing {moviesCount} movies in the database</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLikeEvent}
            onDelete={this.handleDeleteEvent}
            sortColumn={this.state.sortColumn}
            onSort={this.handelSort}
          />
          <Pagination
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            itemsCount={moviesCount}
            onPageChanged={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
