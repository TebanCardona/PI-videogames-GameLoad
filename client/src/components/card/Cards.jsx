import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";
import { Link } from "react-router-dom";
import "../../css/cards.css";
function Card({ name, image, id, rating, genres, platforms, fav }) {
  const dispatch = useDispatch();
  const [favAnimate, setFavAnimate] = useState(fav || false);
  const star = "⭐";
  const handleFav = () => {
    const favA = !favAnimate;
    setFavAnimate(favA);

    if (favA) {
      fav = true;
      dispatch(addFav([{ name, image, id, fav }]));
    } else {
      fav = false;
      dispatch(removeFav({ name, id, fav }));
    }
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
        <button onClick={handleFav} className="fav-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill={favAnimate ? "#FF3131" : "#333333"}
              d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
            ></path>
          </svg>
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
