"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/footer/Footer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLoad } from "@/lib/features/loadSlice";
import { gameApi, useGetGamesByIdQuery } from "@/lib/services/gameApi";
import "../../css/detail.css";
export default function Detail({ params }) {
  const dispatch = useAppDispatch();
  const [gameDetail, setGameDetail] = useState();
  const id = params.slug;
  const gameDetailFetch = useGetGamesByIdQuery({ id });
  useEffect(() => {
    dispatch(setLoad(true));
    if (gameDetailFetch.isSuccess) {
      setGameDetail(gameDetailFetch.data);
      dispatch(setLoad(false));
    }
  }, [dispatch, id, gameDetailFetch.isSuccess]);
  let { load } = useAppSelector((state) => state.loadReducer);
  return (
    <>
      <Nav />
      <div className="detail">
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
        {!load && (
          <div className="detail-content">
            <div className="title-image">
              {" "}
              <h1>{gameDetail?.name}</h1>
              <img
                src={gameDetail?.image}
                alt={gameDetail?.name}
                style={{
                  width: "600px",
                  maxHeight: "300px",
                  borderRadius: "1em",
                }}
              />
            </div>
            <div className="detail-text">
              <h2>Description: </h2>
              <div
                dangerouslySetInnerHTML={{ __html: gameDetail?.description }}
              ></div>
              <br />
              <br />
              <span className="title-detail">
                {" "}
                <b> Rating: </b>{" "}
              </span>{" "}
              <span>{gameDetail?.rating} ⭐</span>
              <br />
              <br />
              <span className="title-detail">
                <b> Released:</b>{" "}
              </span>{" "}
              <span>{gameDetail?.released}</span>
              <br />
              <br />
              <span className="title-detail">
                <b>Genres: </b>
              </span>
              {gameDetail?.genres?.map((genre) => (
                <span key={genre}>{genre} </span>
              ))}
              <br />
              <br />
              <span className="title-detail">
                {" "}
                <b>Platforms:</b>{" "}
              </span>
              {gameDetail?.platforms?.map((platform) => (
                <span key={platform}>{platform} </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
