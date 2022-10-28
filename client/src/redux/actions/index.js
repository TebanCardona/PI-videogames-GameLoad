import axios from "axios";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_DETAILS = "GET_GAME_DETAILS";
export const GET_GAMES_NAME = "GET_GAMES_NAME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const FILTERS = "FILTERS";
export const SET_ALL_PAGE = "SET_ALL_PAGE";
export const LOADING = "LOADING";

export const getAllGames = () => {
  return async function (dispatch) {
    let games = await axios("http://localhost:3001/videogames");
    return dispatch({ type: GET_ALL_GAMES, payload: games.data });
  };
};

export const getAllGenres = () => {
  return async function (dispatch) {
    let genres = await axios("http://localhost:3001/genres");
    return dispatch({ type: GET_ALL_GENRES, payload: genres.data });
  };
};

export const getGameName = (name) => {
  return async function (dispatch) {
    let game = await axios(`http://localhost:3001/videogames?name=${name}`);
    return dispatch({ type: GET_GAMES_NAME, payload: game.data });
  };
};

export const getGameDetail = (id) => {
  return async function (dispatch) {
    let game = await axios(`http://localhost:3001/videogames/${id}`);
    return dispatch({ type: GET_GAME_DETAILS, payload: game.data });
  };
};
export const order = (games) => {
  return {
    type: FILTERS,
    payload: games,
  };
};
export const loading = (load) => {
  return {
    type: LOADING,
    payload: load,
  };
};
export const setAllPage = (pages) => {
  return {
    type: SET_ALL_PAGE,
    payload: pages,
  };
};
