import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from "../../redux/actions";
import imageFilter from "../../img/filter.png";
import "../../css/filters.css";
export default function Filters() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);
  const genres = useSelector((state) => state.genres);
  return (
    <div className="filter">
      <img src={imageFilter} alt="logo filter" className="logo-filter" />
      <span>Filters</span>
      <div>
        <span>Created : </span>
        <input type={"checkbox"} />
      </div>
      <div>
        <span>Genres:</span>
        <select name="Genres" id="genres">
          <option>Select</option>
          {genres.map((genre) => {
            return (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <span>Sort:</span>
        <select name="sort" id="sort">
          <option>None</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Max-Rating">Max-Rating</option>
          <option value="Min-Rating">Min-Rating</option>
        </select>
      </div>
    </div>
  );
}
