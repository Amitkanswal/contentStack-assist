import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import Assist from "./Assist";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./protected_route";
import 'cors'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={renderProps => (
              <Login {...renderProps} data={this.returningFunction} />
            )}
          />
          <ProtectedRoute
            exact
            path="/contentstack/:uid"
            component={Assist}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
