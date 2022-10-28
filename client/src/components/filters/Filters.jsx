import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, order } from "../../redux/actions";
import imageFilter from "../../img/filter.png";
import "../../css/filters.css";
export default function Filters() {
  const [filters, setFilters] = useState({
    genre: "Select",
    created: false,
    sort: "None",
  });
  const dispatch = useDispatch();
  const { genres, games } = useSelector((state) => state);
  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]:
        event.target.name === "created"
          ? event.target.checked
          : event.target.value,
    });
  };
  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);
  useEffect(() => {
    var gamesArr = [...games];
    console.log(filters);
    if (filters.created)
      gamesArr = gamesArr.filter((game) => game.id.length > 7);
    if (filters.genre === "Select") dispatch(order(gamesArr));
    if (filters.genre !== "Select") {
      gamesArr = gamesArr.filter((game) => {
        let hasGenre = false;
        game.genres.forEach((genres) => {
          if (genres === filters.genre) hasGenre = true;
        });
        return hasGenre;
      });
    }
    if (filters.sort !== "None") {
      let type, value;
      switch (filters.sort) {
        case "A-Z":
          type = "name";
          value = 1;
          break;
        case "Z-A":
          type = "name";
          value = -1;
          break;
        case "Max-Rating":
          type = "rating";
          value = -1;
          break;
        case "Min-Rating":
          type = "rating";
          value = 1;
          break;
        default:
          break;
      }
      gamesArr = gamesArr.sort((a, b) => {
        if (a[type] > b[type]) return 1 * value;
        if (a[type] < b[type]) return -1 * value;
        return 0;
      });
    }
    dispatch(order(gamesArr));
  }, [filters]);

  return (
    <div className="filter">
      <img src={imageFilter} alt="logo filter" className="logo-filter" />
      <span>Filters</span>
      <div>
        <span>Created : </span>
        <input type={"checkbox"} name="created" onChange={handleChange} />
      </div>
      <div>
        <span>Genres:</span>
        <select
          name="genre"
          id="genres"
          onChange={handleChange}
          value={filters.genre}
        >
          <option value="Select">Select</option>
          {genres.map((genre) => {
            return (
              <option value={genre.name} key={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <span>Sort:</span>
        <select name="sort" id="sort" onChange={handleChange}>
          <option value="None">None</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Max-Rating">Max-Rating</option>
          <option value="Min-Rating">Min-Rating</option>
        </select>
      </div>
    </div>
  );
}
