import React from "react";
import { Link } from "react-router-dom";
import "../../css/cards.css";
const Card = ({ name, image, id, rating, genres, platforms }) => {
  return (
    <div className="card">
      <div className="link-card">
        <Link
          to={`/game/${id}`}
          style={{ textDecoration: "none", color: "blue" }}
        >
          <h3>{name}</h3>
          <img
            src={image}
            alt={name}
            style={{ width: "280px", borderRadius: "1em" }}
          />
        </Link>
      </div>
      <h4>Rating: {rating} ⭐</h4>
      <h5>Genres:</h5>
      {genres.map((genre) => (
        <span key={genre}>{genre} | </span>
      ))}{" "}
      <h5>Platforms:</h5>
      {platforms.map((platform) => (
        <span key={platform}>{platform} | </span>
      ))}
    </div>
  );
};
export default Card;
