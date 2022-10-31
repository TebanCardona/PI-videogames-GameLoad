import axios from "axios";
export const FILTERS = "FILTERS";
export const LOADING = "LOADING";
export const REFRESH = "REFRESH";
export const POST_GAME = "POST_GAME";
export const REMOVE_GAME = "REMOVE_GAME";
export const SET_ALL_PAGE = "SET_ALL_PAGE";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const GET_GAMES_NAME = "GET_GAMES_NAME";
export const GET_GAME_DETAILS = "GET_GAME_DETAILS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const GET_ALL_PLATFORMS = "GET_ALL_PLATFORMS";

export const getAllGames = () => {
  console.log("Allgames ");
  return async function (dispatch) {
    let games = await axios("http://localhost:3001/videogames");
    return dispatch({ type: GET_ALL_GAMES, payload: games.data });
  };
};
export const getAllGenres = () => {
  console.log("Allgenres ");

  return async function (dispatch) {
    let genres = await axios("http://localhost:3001/genres");
    return dispatch({ type: GET_ALL_GENRES, payload: genres.data });
  };
};
export const getGameName = (name) => {
  console.log("Allgames BY NAMe");

  return async function (dispatch) {
    try {
      let games = await axios(`http://localhost:3001/videogames?name=${name}`);
      return dispatch({
        type: GET_GAMES_NAME,
        payload: games.data.slice(0, 15),
      });
    } catch (error) {
      console.log(error.response.data);
      return dispatch({ type: GET_ALL_GAMES, payload: error.response.data });
    }
  };
};
export const getGameDetail = (id) => {
  console.log("DETAIL");

  return async function (dispatch) {
    let game = await axios(`http://localhost:3001/videogames/${id}`);
    return dispatch({ type: GET_GAME_DETAILS, payload: game.data });
  };
};
export const order = (games) => {
  console.log("ORDER");

  return {
    type: FILTERS,
    payload: games,
  };
};
export const loading = (load) => {
  console.log("LOADING");

  return {
    type: LOADING,
    payload: load,
  };
};
export const setAllPage = (games) => {
  console.log("SETALLPAGE");

  let pages = Math.ceil(games.length / 15);
  let gamesArr = [];
  for (let i = 0; i < pages; i++) {
    gamesArr.push(games.slice(i * 15, (i + 1) * 15));
  }
  return {
    type: SET_ALL_PAGE,
    payload: { gamesArr, pages },
  };
};
export const setCurrentPage = (page) => {
  console.log("CURRENT PAGE");

  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};
export const refresh = () => {
  console.log("REFRESH");
  return {
    type: REFRESH,
  };
};
export const removeGame = () => {
  console.log("REMOVEGAME");
  return {
    type: REMOVE_GAME,
    payload: {},
  };
};
export const getAllPlatforms = () => {
  console.log("PLATFORMS");
  return async function (dispatch) {
    let platforms = await axios("http://localhost:3001/platforms");
    return dispatch({ type: GET_ALL_PLATFORMS, payload: platforms.data });
  };
};
export const postGame = (game) => {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/videogames", game)
      .then((res) => {
        return dispatch({ type: POST_GAME, payload: res });
      })
      .catch((error) => {
        return dispatch({ type: POST_GAME, payload: error });
      });
  };
};
