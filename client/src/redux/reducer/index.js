import {
  ADD_FAV,
  FILTERS,
  LOADING,
  REFRESH,
  POST_GAME,
  REMOVE_GAME,
  REMOVE_MESSAGE,
  SET_ALL_PAGE,
  GET_ALL_GAMES,
  GET_ALL_GENRES,
  GET_GAMES_NAME,
  SET_CURRENT_PAGE,
  GET_GAME_DETAILS,
  GET_ALL_PLATFORMS,
  REMOVE_FAV,
} from "../actions/index";
// Importa las action types acá

const initialState = {
  fav: [],
  res: {},
  pages: [],
  games: [],
  genres: [],
  platforms: [],
  pageGames: [],
  gameDetail: {},
  gamesFilter: [],
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
    case POST_GAME:
      return {
        ...state,
        res: action.payload,
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
        currentPage: action.payload,
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
    case REMOVE_MESSAGE:
      return {
        ...state,
        res: action.payload,
      };
    case ADD_FAV:
      if (state.fav.find(el => el.id === action.payload[0].id)) return { ...state }
      return {
        ...state,
        fav: [...state.fav, ...action.payload]
      }
    case REMOVE_FAV:
      return {
        ...state,
        fav: state.fav.filter(el => el.id !== action.payload)
      }
    default: {
      return { ...state };
    }
  }
};

export default rootReducer;
