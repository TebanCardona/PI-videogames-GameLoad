import {
  GET_ALL_GAMES,
  GET_ALL_GENRES,
  GET_GAME_DETAILS,
} from "../actions/index";
// Importa las action types acá

const initialState = {
  games: [],
  genres: [],
  gameDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        games: action.payload,
      };
    case GET_GAME_DETAILS:
      return {
        ...state,
        gameDetail: action.payload,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    default: {
      return { ...state };
    }
  }
};

export default rootReducer;
