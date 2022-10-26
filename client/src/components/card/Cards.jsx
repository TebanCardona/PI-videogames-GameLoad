import React from "react";
import { Link } from "react-router-dom";

const Card = ({ name, image, id }) => {
  return (
    <div className="card">
      <Link to={`/game/${id}`}>
        <h3>{name}</h3>
        <img src={image} alt={name} style={{ width: "300px" }} />
      </Link>
    </div>
  );
};
export default Card;
