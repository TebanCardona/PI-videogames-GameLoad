import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import Cards from "../card/Cards.jsx";
import "../../css/home.css";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadPage() {
      dispatch(actions.loading(true));
      await dispatch(actions.getAllGames());
      dispatch(actions.loading(false));
    }
    loadPage();
  }, [dispatch]);
  let { games, gamesFilter, load } = useSelector((state) => state);
  // console.log(games);
  games = gamesFilter;
  return (
    <>
      {load && <div className="not-load"></div>}
      {!load && games.length === 0 && (
        <div className="not-games">Games not found</div>
      )}
      {!load && typeof games[0]?.error === "string" && (
        <div className="not-games">{games[0].error}</div>
      )}
      {!load && games.length > 0 && (
        <div className="cards-all">
          {games.map((game) => {
            return (
              <div key={game.id}>
                <Cards name={game.name} image={game.image} id={game.id} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Home;
