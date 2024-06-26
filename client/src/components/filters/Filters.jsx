import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useGetPlatformsQuery } from "@/lib/services/platformsApi";
import { useGetGenresQuery } from "@/lib/services/genresApi";
import { setAllPage } from "@/lib/features/pageSlice";
import SearchBar from "./SearchBar";
import Image from "next/image";
import imageFilter from "../../img/filter.png";
import "../../app/css/filters.css";
export default function Filters() {
  const [filters, setFilters] = useState({
    genre: "Select",
    platform: "Select",
    created: false,
    sort: "None",
  });
  const dispatch = useAppDispatch();
  const games = useAppSelector((state) => state.filterReducer.gamesFilter);
  const { load } = useAppSelector((state) => state.loadReducer);
  const genres = useGetGenresQuery(null).currentData;
  const platforms = useGetPlatformsQuery(null).currentData;
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
    if (!load) {
      let gamesArr = games.flat();
      if (filters.created)
        gamesArr = gamesArr.filter((game) => game.id.length > 7);
      if (filters.genre !== "Select") {
        gamesArr = gamesArr.filter((game) => {
          let hasGenre = false;
          game.genres.forEach((genres) => {
            if (genres === filters.genre) hasGenre = true;
          });
          return hasGenre;
        });
      }
      if (filters.platform !== "Select") {
        gamesArr = gamesArr.filter((game) => {
          let hasplatform = false;
          game.platforms.forEach((platforms) => {
            if (platforms === filters.platform) hasplatform = true;
          });
          return hasplatform;
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
          if (type === "name") {
            if (a[type].toLowerCase() > b[type].toLowerCase()) return 1 * value;
            if (a[type].toLowerCase() < b[type].toLowerCase())
              return -1 * value;
          }
          if (a[type] > b[type]) return 1 * value;
          if (a[type] < b[type]) return -1 * value;
          return 0;
        });
      }

      if (games.length > 0) dispatch(setAllPage(gamesArr));
    }
  }, [filters, load]);

  return (
    <>
      {" "}
      {load && <></>}
      {!load && games?.length === 0 && <></>}
      {!load && games?.length > 0 && (
        <div className="filter-all">
          <SearchBar />
          <div className="filter">
            <Image
              src={imageFilter}
              alt="logo filter"
              className="logo-filter"
            />
            <span className="title-filters">
              {" "}
              <b> Filters </b>
            </span>
            <div className="created">
              <span className="text-filters" id="created">
                Created :{" "}
              </span>
              <div className="cntr">
                <input
                  type={"checkbox"}
                  name="created"
                  onChange={handleChange}
                  id="cbx"
                  className="hidden-xs-up"
                />
                <label htmlFor="cbx" className="cbx"></label>
              </div>
            </div>
            <div>
              <span className="text-filters">Platforms : </span>
              <select
                name="platform"
                id="platforms"
                onChange={handleChange}
                value={filters.platform}
                className="select-filters"
              >
                <option value="Select">Select</option>
                {platforms?.map((p) => (
                  <option value={p} key={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-filters">Genres : </span>
              <select
                name="genre"
                id="genres"
                onChange={handleChange}
                value={filters.genre}
                className="select-filters"
              >
                <option value="Select">Select</option>
                {genres?.map((genre) => {
                  return (
                    <option value={genre.name} key={genre.id}>
                      {genre.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <span className="text-filters">Sort : </span>
              <select
                name="sort"
                id="sort"
                onChange={handleChange}
                className="select-filters"
              >
                <option value="None">None</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Max-Rating">Max-Rating</option>
                <option value="Min-Rating">Min-Rating</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
