import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loading, getGameName, setAllPage } from "../../redux/actions";
import store from "../../redux/store";
import "../../css/searchbar.css";
export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    async function searchPage() {
      dispatch(loading(true));
      await dispatch(getGameName(name));
      let game = store.getState().games;
      await dispatch(setAllPage(game));
      dispatch(loading(false));
    }
    searchPage();
    setName("");
  };
  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a videogame name..."
          onChange={handleChange}
          className="input-search"
        />
        <button type="submit" value="submit" className="btn">
          <span className="button-text">Search</span>
        </button>
      </form>
    </div>
  );
}
