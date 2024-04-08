import React, { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setLoad } from "@/lib/features/loadSlice";
import { gameApi } from "@/lib/services/gameApi";
import { setAllPage } from "@/lib/features/pageSlice";
import { setFilter } from "@/lib/features/filterSlice";
import "../../app/css/searchbar.css";
export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    async function searchPage() {
      const fetch = gameApi.endpoints.getGamesByName.initiate(
        { name },
        {
          subscribe: true,
        }
      );
      dispatch(setLoad(true));
      const games = await dispatch(fetch);
      if (games.isSuccess) {
        dispatch(setAllPage(games.data));
        dispatch(setFilter(games.data));
        dispatch(setLoad(false));
      }
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
