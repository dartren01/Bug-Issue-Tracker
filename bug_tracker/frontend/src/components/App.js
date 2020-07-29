import React, { Component, Fragment } from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './layout/Header';
import Dashboard from "./pages/Dashboard";
import TicketForm from "./pages/TicketForm";
import TicketUpdate from "./pages/TicketUpdate";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" render={(props) => (
                <Dashboard {...props} />
              )} />
              <Route exact path="/create_ticket" render={(props) => (
                <TicketForm {...props} />
              )} />
              <Route exact path="/update_ticket" render={(props) => (
                <TicketUpdate {...props} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);