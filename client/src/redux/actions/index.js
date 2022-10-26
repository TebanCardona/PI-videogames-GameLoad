import axios from "axios";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_DETAILS = "GET_GAME_DETAILS";
export const GET_GAMES_NAME = "GET_GAMES_NAME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const ORDER_BY_GENRE = "ORDER_BY_GENRE";

export const getAllGames = () => {
  return async function (dispatch) {
    let games = await axios("http://localhost:3001/videogames");
    return dispatch({ type: GET_ALL_GAMES, payload: games.data });
  };
};

export const getAllGenres = () => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/genres`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_ALL_GENRES,
          payload: data,
        });
      });
  };
};

export const getGameName = (name) => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames?name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_GAMES_NAME,
          payload: data,
        });
      });
  };
};

export const getGameDetail = (id) => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_GAME_DETAILS,
          payload: data,
        });
      });
  };
};
export const orderGenre = (genre) => {
  return {
    type: ORDER_BY_GENRE,
    payload: genre,
  };
};
