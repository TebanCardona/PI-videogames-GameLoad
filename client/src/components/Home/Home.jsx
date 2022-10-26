import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import Cards from "../card/Cards.jsx";
import "../../css/home.css";
function Home() {
  const [loader, setloader] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getAllGames());
    setloader(true);
  }, [dispatch]);
  const games = useSelector((state) => state.games);
  return (
    <div className="home">
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
