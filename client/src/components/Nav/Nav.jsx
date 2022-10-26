import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import joystick from "../../img/joystick.png";
import create from "../../img/create.png";
import arrow from "../../img/back.png";
import "../../css/nav.css";
export default function Nav() {
  const back = useHistory();
  function handleClik() {
    back.goBack();
  }
  return (
    <div className="div-nav">
      <button type={"button"} onClick={handleClik} className="back">
        <div className="nav-center">
          <span className="title-botton">Back</span>
          <img src={arrow} alt="arrow back" className="logo" />
        </div>
      </button>
      <NavLink
        to={"/home"}
        style={{
          textDecoration: "none",
          color: "blue",
        }}
        activeStyle={{
          fontWeight: "bold",
          color: "red",
        }}
      >
        <div className="nav-center">
          <span className="title">Game Load</span>
          <img src={joystick} alt="Logo" className="logo" />
        </div>
      </NavLink>
      <NavLink
        to={"/create"}
        style={{
          textDecoration: "none",
          color: "blue",
        }}
        activeStyle={{
          fontWeight: "bold",
          color: "red",
        }}
      >
        <div className="nav-center">
          <span className="title"> Create Game</span>
          <img src={create} alt="Logo create" className="logo" />
        </div>
      </NavLink>
    </div>
  );
}
