import React from "react";
import close from "../../img/close.png";

const Genres = (props) => {
  return (
    <div className="into-genres-platforms">
      <h4>{props.name}</h4>
      {props.onClose ? (
        <button type="button" onClick={props.onClose} className="close">
          <img src={close} alt="logo close" className="img-close" />
        </button>
      ) : null}
    </div>
  );
};

export default Genres;
