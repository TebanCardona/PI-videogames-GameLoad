import React from "react";

const Genres = (props) => {
  return (
    <div>
      <h4>{props.name}</h4>
      {props.onClose ? (
        <button type="button" onClick={props.onClose}>
          X
        </button>
      ) : null}
    </div>
  );
};

export default Genres;
