import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import store from "../../redux/store";
import Cards from "../card/Cards.jsx";
import "../../css/home.css";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadPage() {
      dispatch(actions.loading(true));
      await dispatch(actions.getAllGames());
      let pageGames = store.getState().games;
      dispatch(actions.setAllPage(pageGames));
      dispatch(actions.loading(false));
    }
    loadPage();
  }, [dispatch]);
  let { games, gamesFilter, load, pageGames } = useSelector((state) => state);
  console.log(pageGames);
  games = gamesFilter;
  return (
    <>
      {load && (
        <div className="loading">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {!load && games.length === 0 && (
        <div className="not-games">
          {" "}
          <span className="not-games-title"> Games not found</span>
        </div>
      )}
      {!load && typeof games[0]?.error === "string" && (
        <div className="not-games">
          <span className="not-games-title">{games[0].error}</span>
        </div>
      )}
      {!load && games.length > 0 && (
        <div className="cards-all">
          {games.map((game) => {
            return (
              <div key={game.id}>
                <Cards
                  name={game.name}
                  image={game.image}
                  id={game.id}
                  rating={game.rating}
                  genres={game.genres}
                  platforms={game.platforms}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Home;
