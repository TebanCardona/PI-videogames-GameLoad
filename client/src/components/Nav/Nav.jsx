import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loading, refresh, getAllGames } from "../../redux/actions";
import joystick from "../../img/joystick.png";
import create from "../../img/create.png";
import arrow from "../../img/back.png";
import refreshLogo from "../../img/refresh1.png";
import "../../css/nav.css";
export default function Nav() {
  const dispatch = useDispatch();
  const back = useHistory();
  function handleClik() {
    back.goBack();
  }
  const handleRefresh = async function () {
    dispatch(loading(true));
    dispatch(refresh());
    await dispatch(getAllGames());
    dispatch(loading(false));
  };
  return (
    <div className="div-nav">
      <button type={"button"} onClick={handleClik} className="back">
        <div className="nav-center">
          <span className="title-botton">Back</span>
          <img src={arrow} alt="arrow back" className="logo" />
        </div>
      </button>
      <button className="back" onClick={handleRefresh}>
        <div className="nav-center">
          <span className="title-botton">Refresh</span>
          <img src={refreshLogo} alt="Logo refresh" className="logo" />
        </div>
      </button>
      <NavLink
        to={"/home"}
        style={{
          textDecoration: "none",
          color: "#aec3b0",
        }}
        activeStyle={{
          fontWeight: "bold",
          color: "#eff6e0",
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
          color: "#aec3b0",
        }}
        activeStyle={{
          fontWeight: "bold",
          color: "#eff6e0",
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
