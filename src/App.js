import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/common/navBar";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/common/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import LogOut from "./components/logout";
import RegistrationForm from "./components/registrationForm";
import ProtectedRoute from "./components/common/protectedRoute";

import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    if (user) {
      this.setState({ user });
    }
  }

  getNavBarLinks() {
    let navBarLinks = [
      { path: "/movies", title: "Movies" },
      { path: "/customers", title: "Customers" },
      { path: "/rentals", title: "Rentals" }
    ];

    const { user } = this.state;

    if (!user) {
      navBarLinks = [
        ...navBarLinks,
        { path: "/login", title: "Login" },
        { path: "/register", title: "Register" }
      ];
    } else {
      navBarLinks = [
        ...navBarLinks,
        { path: "/profile", title: user.name },
        { path: "/logout", title: "Logout" }
      ];
    }
    return navBarLinks;
  }

  render() {
    const navBarLinks = this.getNavBarLinks();
    const navBarButton = {
      title: "Vidly",
      path: "/"
    };
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar
          button={navBarButton}
          items={navBarLinks}
          user={this.state.user}
        />
        <p />
        <div className="content">
          <Switch>
            <Route path="/register" component={RegistrationForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={LogOut} />
            <ProtectedRoute path="/movies/new" component={MovieForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />

            {/* <Route path="/movies" exact component={Movies} /> */}
            <Route
              path="/movies"
              exact
              render={props => <Movies {...props} user={user} />}
            />
            <Route path="/not-found" component={NotFound} />

            <Redirect from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
