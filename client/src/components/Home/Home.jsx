import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import store from "../../redux/store";
import Cards from "../card/Cards.jsx";
import Pagination from "../pagination/Pagination";
import "../../css/home.css";
function Home() {
  const dispatch = useDispatch();
  let games = store.getState().games;
  console.log(games[3]);
  useEffect(() => {
    async function loadPage() {
      dispatch(actions.loading(true));
      if (!games[0]) {
        await dispatch(actions.getAllGames());
      }
      let allGames = store.getState().games;
      dispatch(actions.setAllPage(allGames));
      dispatch(actions.loading(false));
    }
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  let { load, pageGames, currentPage } = useSelector((state) => state);
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
      {!load && pageGames.length === 0 && (
        <div className="not-games">
          {" "}
          <span className="not-games-title"> Games not found</span>
        </div>
      )}
      {!load && pageGames[0]?.[0].error && (
        <div className="not-games">
          <span className="not-games-title">
            {pageGames[0][0].error}. Please refresh the page
          </span>
        </div>
      )}
      {!load && !pageGames[0]?.[0].error && pageGames.length > 0 && (
        <div className="Home-content">
          <Pagination />
          <div className="cards-all">
            {pageGames[currentPage]?.map((game) => {
              return (
                <div key={game.id} className="card">
                  <Cards game={game} />
                </div>
              );
            })}
          </div>
          <Pagination />
        </div>
      )}
    </>
  );
}

export default Home;
