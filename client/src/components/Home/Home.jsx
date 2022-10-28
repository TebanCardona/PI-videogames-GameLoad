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
  if (gamesFilter.length > 0) games = gamesFilter;
  return (
    <div>
      {load && games.length === 0 && <div className="not-load"></div>}
      {games.map((game) => {
        return (
          <div key={game.id}>
            <Cards name={game.name} image={game.image} id={game.id} />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
