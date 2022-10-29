import {
  GET_ALL_GAMES,
  GET_GAMES_NAME,
  GET_ALL_GENRES,
  GET_GAME_DETAILS,
  FILTERS,
  SET_ALL_PAGE,
  LOADING,
  REFRESH,
  REMOVE_GAME,
  GET_ALL_PLATFORMS,
  SET_CURRENT_PAGE,
} from "../actions/index";
// Importa las action types acá

const initialState = {
  games: [],
  genres: [],
  platforms: [],
  pageGames: [],
  gameDetail: {},
  gamesFilter: [],
  pages: [],
  currentPage: 0,
  load: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        games: action.payload,
      };
    case GET_GAMES_NAME:
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
    case SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_ALL_PAGE:
      return {
        ...state,
        pageGames: action.payload.gamesArr,
        pages: action.payload.pages,
        currentPage: 0,
      };
    case REFRESH:
      return {
        ...state,
        gamesName: [],
        gamesFilter: [],
        games: [],
      };
    case REMOVE_GAME:
      return {
        ...state,
        gameDetail: action.payload,
      };
    case GET_ALL_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    default: {
      return { ...state };
    }
  }
};

export default rootReducer;
