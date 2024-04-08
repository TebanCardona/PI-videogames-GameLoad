"use client";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { setAllPage } from "@/lib/features/pageSlice";
import { gameApi } from "@/lib/services/gameApi";
import { setLoad } from "@/lib/features/loadSlice";
import Cards from "@/components/card/Cards";
import Pagination from "@/components/pagination/Pagination";
import Nav from "@/components/Nav/Nav";
import Filters from "@/components/filters/Filters";
import Footer from "@/components/footer/Footer";
import "../css/home.css";
import { setFilter } from "@/lib/features/filterSlice";

function Page() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loadPage = async () => {
      const fetch = gameApi.endpoints.getGames.initiate(null, {
        subscribe: true,
      });
      const games = await dispatch(fetch);
      if (games.isSuccess) {
        dispatch(setAllPage(games.data));
        dispatch(setFilter(games.data));
        dispatch(setLoad(false));
      }
    };
    loadPage();
  }, []);
  let { load } = useAppSelector((state) => state.loadReducer);
  let { pagesGames, currentPage } = useAppSelector(
    (state) => state.pageReducer
  );
  return (
    <>
      {" "}
      <Nav />
      <Filters games={pagesGames} />
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
      {!load && pagesGames.length === 0 && (
        <div className="not-games">
          {" "}
          <span className="not-games-title"> Games not found</span>
        </div>
      )}
      {!load && pagesGames[0]?.[0].error && (
        <div className="not-games">
          <span className="not-games-title">
            {pagesGames[0][0].error}. Please refresh the page
          </span>
        </div>
      )}
      {!load && !pagesGames[0]?.[0].error && pagesGames.length > 0 && (
        <div className="Home-content">
          <Pagination />
          <div className="cards-all">
            {pagesGames[currentPage]?.map((game) => {
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
      <Footer />
    </>
  );
}

export default Page;
