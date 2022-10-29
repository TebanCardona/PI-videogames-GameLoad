import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loading, getGameName } from "../../redux/actions";
import "../../css/searchbar.css";
export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loading(true));
    await dispatch(getGameName(name));
    setName("");
    dispatch(loading(false));
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
