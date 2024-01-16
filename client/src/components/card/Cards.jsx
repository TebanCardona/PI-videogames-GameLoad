import React from "react";
import { useDispatch } from "react-redux";
import { addFav } from "../../redux/actions";
import { Link } from "react-router-dom";
import "../../css/cards.css";
function Card({ name, image, id, rating, genres, platforms }) {
  const dispatch = useDispatch();
  const star = "⭐";
  const handleFav = () => {
    dispatch(addFav([{ name, image, id }]));
  };
  return (
    <div className="card2">
      <div className="link-card">
        <Link
          to={`/game/${id}`}
          style={{ textDecoration: "none", color: "blue" }}
        >
          <h3>{name}</h3>
          <img
            src={image}
            alt={name}
            style={{ width: "280px", borderRadius: "1em", maxHeight: "200px" }}
          />
        </Link>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button style={{ height: "20px" }} onClick={handleFav}>
          Fav
        </button>
      </div>
      <div className="content-card">
        <h4>
          Rating: {rating} {star.repeat(Number(rating))}
        </h4>
        <h5>Genres:</h5>
        {genres.map((genre) => (
          <span key={genre}>{genre} | </span>
        ))}{" "}
        <h5>Platforms:</h5>
        {platforms.map((platform) => (
          <span key={platform}>{platform} | </span>
        ))}
      </div>
    </div>
  );
}
export default Card;
