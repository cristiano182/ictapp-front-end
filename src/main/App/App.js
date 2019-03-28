import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import Routes from "../Routes/Routes";
import Menu from "../Menu/Menu";

export default class App extends Component {
  render() {
    return (
      <Router style={{ width: "100%" }}>
        <div className="App">
          <Menu />
          <Routes />
        </div>
      </Router>
    );
  }
}
