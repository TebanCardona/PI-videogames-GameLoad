import React, { Component } from "react";
import linkedin from "../../img/linkedin.png";
import "../../css/linkedin.css";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer>
          <p>© Copyright 2022 - Esteban Cardona</p>
          <a href="https://www.linkedin.com/in/esteban-fabian-cardona-sarria-7695041a8/">
            <img
              src={linkedin}
              alt="Logo linkedin"
              className="logo"
              style={{ borderRadius: "1em" }}
            />
          </a>
        </footer>
      </div>
    );
  }
}
