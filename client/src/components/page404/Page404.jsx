import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/page404.css";
export default class Page404 extends Component {
  render() {
    return (
      <div className="page404">
        <h1>Page 404</h1>
        <h2>Page not Found</h2>
        <Link to="/home">
          <h2>Back to home</h2>
        </Link>
      </div>
    );
  }
}
