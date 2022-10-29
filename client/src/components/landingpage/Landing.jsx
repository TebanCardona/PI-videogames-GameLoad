import React, { Component } from "react";
import { Link } from "react-router-dom";
import background from "../../img/preview.gif";
import "../../css/landing.css";
export default class Lading extends Component {
  render() {
    return (
      <div className="landing">
        <img src={background} alt="" className="image-start" />
        <div className="landing-content">
          {" "}
          <h1 className="title-start">Games Load</h1>
          <Link to={"/home"}>
            <button type={"button"} className="button-start">
              <span>PLAY NOW</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
