/*

The root component of the frontend. Frontend routes are defined here.
Currently everthing is rendered under the "/" route.
It renders the <App /> component under "/" where the main frontend logic in implemented.

*/

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Main extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
