"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Genres from "@/components/genre/Genres";
import Platforms from "@/components/platforms/Platforms";
import "../css/creategame.css";
import Nav from "@/components/Nav/Nav";
import { genresApi, useGetGenresQuery } from "@/lib/services/genresApi";
import { useGetPlatformsQuery } from "@/lib/services/platformsApi";
import { gameApi } from "@/lib/services/gameApi";
const Creategame = () => {
  const dispatch = useAppDispatch();
  const genres = useGetGenresQuery(null).data;
  const platforms = useGetPlatformsQuery(null).data;
  const res = {};
  const [errors, setErrors] = useState({
    globalError: true,
  });
  const [state, setState] = useState({
    name: "",
    image: "",
    rating: 1,
    genres: [],
    released: "",
    platforms: [],
    description: "",
  });
  function validate(state) {
    let errors = { globalError: false };
    if (state.name === "") {
      errors.globalError = true;
      errors.name = "Name is required";
    } else if (!/[a-zA-ZñÑ]/.test(state.name)) {
      errors.name = "Name does`t have only numbers";
      errors.globalError = true;
    }
    if (
      !(state.image.length === 0) &&
      !/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(state.image)
    ) {
      errors.image = "Image URL is not valid";
      errors.globalError = true;
    }
    if (
      !(state.rating.length === 0) &&
      !(state.rating >= 1.0 && state.rating <= 5.0)
    ) {
      errors.rating = "Rating must be a number between 1 and 5";
      errors.globalError = true;
    }
    if (state.genres.length === 0) {
      errors.genres = "Need minimum 1 Genre";
      errors.globalError = true;
    }
    if (state.platforms.length === 0) {
      errors.platforms = "Need minimum 1 Genre";
      errors.globalError = true;
    }
    if (state.description.length === 0) {
      errors.description = "Description is require";
      errors.globalError = true;
    }
    if ((state.released = "")) {
      errors.description = "Realeased is require";
      errors.globalError = true;
    }
    return errors;
  }
  const handleBlur = (e) => {
    setErrors(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleChange = (e) => {
    validate(state);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const close = (type, name) => {
    setState({ ...state, [type]: state[type].filter((e) => e.name !== name) });
  };
  const handleGPChange = (e) => {
    const buscar = state[e.target.name]?.find(
      (el) => el.name === e.target.value
    );
    if (buscar) {
      return;
    }
    setErrors(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
    if (e.target.value !== "Select") {
      setState({
        ...state,
        [e.target.name]: [
          ...state[e.target.name],
          ...[{ name: e.target.value }],
        ],
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.globalError) {
      let game = state;
      if (game.image === "") delete game.image;
      if (game.released === "") delete game.released;
      if (game.rating === "") delete game.rating;

      if (game.released) game.released = Date.parse(game.released);
      game.genres = game.genres.map((e) => e.name);
      game.platforms = game.platforms.map((e) => e.name);
      game = JSON.stringify(game);
      const postGame = gameApi.endpoints.postGame.initiate(
        { body: game },
        { subscribe: true }
      );
      const data = dispatch(postGame);
      console.log(data);
      setState({
        name: "",
        image: "",
        rating: 1,
        genres: [],
        released: "",
        platforms: [],
        description: "",
      });
    }
  };

  return (
    <>
      <Nav />
      <div className="div-form">
        {res?.message && <p>{res.message}</p>}
        {res?.error && <p>{res.error}</p>}
        <form onSubmit={handleSubmit} className={"form-content"}>
          <label className="text-form">
            {" "}
            <b>Name: </b>
          </label>
          <div className="form">
            <input
              type="text"
              name={"name"}
              value={state.name}
              className="input"
              placeholder="Type here the name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="input-border"></span>
          </div>

          {errors.name && <p className="error">{errors.name}</p>}
          <label className="text-form">
            <b>Image: </b>
          </label>
          <div className="form">
            <input
              type={"text"}
              name={"image"}
              className="input"
              placeholder="Type here the image"
              value={state.image}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="input-border"></span>
          </div>
          {errors.image && <p className="error">{errors.image}</p>}
          <label className="text-form">
            {" "}
            <b>Rating: </b>
          </label>
          <div className="form">
            <input
              type={"float"}
              min={1}
              max={5}
              className="input"
              value={state.rating}
              name={"rating"}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="input-border"></span>
          </div>
          {errors.rating && <p className="error">{errors.rating}</p>}
          <label className="text-form">Released: </label>
          <input
            type={"date"}
            name={"released"}
            className={"date"}
            onChange={handleChange}
            required
          />
          <label className="text-form">
            {" "}
            <b>Genres: </b>
          </label>
          <select
            name="genres"
            id="genres"
            onChange={handleGPChange}
            className="select-filters"
            value={"Select"}
          >
            <option value="Select">Select</option>
            {genres?.map((genre) => {
              return (
                <option value={genres.name} key={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>
          <div className="div-genres-platforms">
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
          {errors.genres && <p className="error">{errors.genres}</p>}
          <label className="text-form">
            {" "}
            <b>Platforms:</b>{" "}
          </label>
          <select
            name="platforms"
            id="platforms"
            className="select-filters"
            onChange={handleGPChange}
            value={"Select"}
          >
            <option value="Select">Select</option>{" "}
            {platforms?.map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
          <div className="div-genres-platforms">
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
          {errors.platforms && <p className="error">{errors.platforms}</p>}
          <label className="text-form">
            {" "}
            <b>Description: </b>
          </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            className="textArea-form"
            onChange={handleChange}
            onBlur={handleBlur}
            value={state.description}
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
          <button type={"submit"} className="form-button">
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
          </button>
        </form>
      </div>
    </>
  );
};
export default Creategame;
