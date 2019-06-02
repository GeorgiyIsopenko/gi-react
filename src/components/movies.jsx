import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    itemsPerPage: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    this.setState({
      movies: await getMovies(),
      genres: [{ _id: "", name: "All Genre" }, ...(await getGenres())],
      selectedGenre: this.defaultGenre
    });
  }

  handleDeleteEvent = async movie => {
    const currentMovies = this.state.movies;

    try {
      const movies = currentMovies.filter(m => m._id !== movie._id);
      this.setState({
        movies
      });
      await deleteMovie(movie._id);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error("This movie has already been deleted");
      }
      this.setState({ movies: currentMovies });
    }
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

  handleSearchEvent = searchQuery => {
    this.setState({ selectedGenre: null, searchQuery });
  };

  handlePageChange = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handelSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleNewMovie = () => {
    this.props.history.replace("/movies/new");
  };

  getPagedData = () => {
    const {
      itemsPerPage,
      currentPage,
      selectedGenre,
      searchQuery,
      movies: allMovies,
      sortColumn
    } = this.state;

    let filtered = allMovies;

    if (searchQuery) {
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(
        movie => movie.genre._id === selectedGenre._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, itemsPerPage, currentPage);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { itemsPerPage, currentPage } = this.state;
    const { user } = this.props;
    const { totalCount, data: movies } = this.getPagedData();

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
          {user && (
            <button
              className="btn btn-primary"
              id="btn_newMovie"
              onClick={this.handleNewMovie}
            >
              New movie
            </button>
          )}
          <p>Showing {totalCount} movies in the database</p>

          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearchEvent}
          />

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
            itemsCount={totalCount}
            onPageChanged={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
