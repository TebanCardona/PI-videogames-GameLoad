import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../redux/actions";
import "../../css/detail.css";
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
  return (
    <div>
      {load && gameDetail && <div className="not-load"></div>}
      {!load && (
        <div>
          {" "}
          <h1>{gameDetail.name}</h1>
          <img
            src={gameDetail.image}
            alt={gameDetail.name}
            style={{ width: "300px" }}
          />
          <p>description: {gameDetail.description}</p>
          <p>rating: {gameDetail.rating} ⭐</p>
          <p>Released: {gameDetail.released}</p>
          <span>genres: </span>
          {gameDetail.genres?.map((genre) => (
            <span key={genre}>{genre} </span>
          ))}
          <p>Platforms: </p>
          {gameDetail.platforms?.map((platform) => (
            <span key={platform}>{platform} </span>
          ))}
        </div>
      )}
    </div>
  );
}
