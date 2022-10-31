import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, getAllPlatforms } from "../../redux/actions";
import Genres from "./Genres.jsx";
import Platforms from "./Platforms";
const Creategame = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);
  const { genres, platforms } = useSelector((state) => state);
  const [state, setState] = useState({
    name: "",
    image: "",
    rating: 1,
    genres: [],
    platforms: [],
    description: "",
  });
  const handleChange = (e) => {
    console.log(e);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const close = (type, name) => {
    setState({ ...state, [type]: state[type].filter((e) => e.name !== name) });
  };
  const handleGPChange = (e) => {
    if (e.target.value !== "selector") {
      setState({
        ...state,
        [e.target.name]: [
          ...state[e.target.name],
          ...[{ name: e.target.value }],
        ],
      });
    }
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column", color: "white" }}
      >
        <label>Name: </label>
        <input type="text" name={"name"} onChange={handleChange} />
        <label>Image: </label>
        <input type={"url"} name={"image"} onChange={handleChange} />
        <label>Rating: </label>
        <input
          type={"number"}
          min={1}
          max={5}
          name={"rating"}
          onChange={handleChange}
        />
        <label>Genres: </label>
        <select name="genres" id="genres" onChange={handleGPChange}>
          <option value="Select">Select</option>
          {genres?.map((genre) => {
            return (
              <option value={genres.name} key={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <div>
          {state.genres?.map((genre) => {
            return (
              <Genres
                key={genre.name}
                name={genre.name}
                onClose={() => close("genres", genre.name)}
              ></Genres>
            );
          })}
        </div>
        <label>Platforms: </label>
        <select name="platforms" id="platforms" onChange={handleGPChange}>
          <option value="Select">Select</option>{" "}
          {platforms?.map((el) => {
            return (
              <option value={el} key={el}>
                {el}
              </option>
            );
          })}
        </select>
        <div>
          {state.platforms?.map((el) => {
            return (
              <Platforms
                key={el.name}
                name={el.name}
                onClose={() => close("platforms", el.name)}
              ></Platforms>
            );
          })}
        </div>
        <label>Description: </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          onChange={handleChange}
        ></textarea>
        <button type={"submit"}>submit</button>
      </form>
    </div>
  );
};
export default Creategame;
