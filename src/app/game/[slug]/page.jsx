"use client";
import Nav from "@/components/Nav/Nav";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useGetGamesByIdQuery } from "@/lib/services/gameApi";
import "../../css/detail.css";
import { useEffect, useState } from "react";
import { setLoad } from "@/lib/features/loadSlice";

function Detail({ params }) {
  const { slug } = params;
  const [description, setDescription] = useState();
  const [gameDetail, setgameDetail] = useState();

  const dispatch = useAppDispatch();

  let gameFetch = useGetGamesByIdQuery({ id: slug });

  useEffect(() => {
    dispatch(setLoad(true));
    if (gameFetch.isSuccess) {
      setDescription({ __html: gameFetch.data.description });
      setgameDetail(gameFetch.data);
      dispatch(setLoad(false));
    }
  }, [gameFetch]);

  const { load } = useAppSelector((state) => state.loadReducer);
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
              <div dangerouslySetInnerHTML={description}></div>
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
    </>
  );
}

export default Detail;
