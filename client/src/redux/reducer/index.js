import {
  GET_ALL_GAMES,
  GET_GAMES_NAME,
  GET_ALL_GENRES,
  GET_GAME_DETAILS,
  FILTERS,
  SET_ALL_PAGE,
  LOADING,
} from "../actions/index";
// Importa las action types acá

const initialState = {
  games: [],
  gamesName: [],
  gamesFilter: [],
  genres: [],
  gameDetail: {},
  load: false,
  pages: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        games: action.payload.slice(0, 15),
      };
    case GET_GAMES_NAME:
      return {
        ...state,
        gamesName: action.payload,
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
    case FILTERS:
      return {
        ...state,
        gamesFilter: action.payload,
      };
    case LOADING:
      return {
        ...state,
        load: action.payload,
      };
    case SET_ALL_PAGE:
      return {
        ...state,
        pages: action.payload,
      };
    default: {
      return { ...state };
    }
  }
};

export default rootReducer;
