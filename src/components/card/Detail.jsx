import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../redux/actions";
import "../../app/css/detail.css";
export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    async function load() {
      dispatch(actions.loading(true));
      await dispatch(actions.getGameDetail(id));
      dispatch(actions.loading(false));
    }
    load();
    return () => {
      dispatch(actions.removeGame());
    };
  }, [dispatch, id]);
  let { gameDetail, load } = useSelector((state) => state);
  console.log(gameDetail.like);
  return (
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
            <h1>{gameDetail.name}</h1>
            <img
              src={gameDetail.image}
              alt={gameDetail.name}
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
              dangerouslySetInnerHTML={{ __html: gameDetail.description }}
            ></div>
            <br />
            <br />
            <span className="title-detail">
              {" "}
              <b> Rating: </b>{" "}
            </span>{" "}
            <span>{gameDetail.rating} ⭐</span>
            <br />
            <br />
            <span className="title-detail">
              <b> Released:</b>{" "}
            </span>{" "}
            <span>{gameDetail.released}</span>
            <br />
            <br />
            <span className="title-detail">
              <b>Genres: </b>
            </span>
            {gameDetail.genres?.map((genre) => (
              <span key={genre}>{genre} </span>
            ))}
            <br />
            <br />
            <span className="title-detail">
              {" "}
              <b>Platforms:</b>{" "}
            </span>
            {gameDetail.platforms?.map((platform) => (
              <span key={platform}>{platform} </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
