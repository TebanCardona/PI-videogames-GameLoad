import React from "react";
import Link from "next/link";
import "../../app/css/cards.css";
function Card({ game }) {
  let { name, image, id, rating, genres, platforms } = game;
  const star = "⭐";

  return (
    <div className="card2">
      <div className="link-card">
        <Link
          href={`/game/${id}`}
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

      <div className="content-card">
        <h4>
          Rating: {rating} {star.repeat(Number(rating))}
        </h4>
        <h4>Genres:</h4>
        {genres?.map((genre) => (
          <span key={genre}>{genre} | </span>
        ))}{" "}
        <h4>Platforms:</h4>
        {platforms?.map((platform) => (
          <span key={platform}>{platform} | </span>
        ))}
      </div>
    </div>
  );
}
export default Card;
