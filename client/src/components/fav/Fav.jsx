import React from "react";
import { removeFav } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import close from "../../img/close.png";
import "../../css/fav.css";
export default function Fav() {
  let fav = useSelector((state) => state.fav);
  const dispatch = useDispatch();
  const handleRemove = (game) => {
    dispatch(removeFav(game));
    fav = store.getState().fav;
  };
  return (
    <div className="content-Fav">
      <h1>Your Favorites</h1>
      <div className="fav-area">
        {fav[0] ? (
          <div className="favs">
            {fav.map((e) => (
              <div key={e.name}>
                <div className="text-img">
                  <img
                    src={close}
                    className={"logo"}
                    alt="Close"
                    onClick={() => handleRemove(e)}
                  />
                  <h3>{e.name}</h3>
                </div>
                <img
                  src={e.image}
                  alt={e.name}
                  style={{ width: "17em", borderRadius: "1em", height: "10em" }}
                />
              </div>
            ))}
          </div>
        ) : (
          <h3 style={{ textAlign: "center" }}>No Favorites</h3>
        )}
      </div>
    </div>
  );
}
