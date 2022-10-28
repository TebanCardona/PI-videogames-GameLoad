import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loading, getGameName } from "../../redux/actions";
export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async () => {
    dispatch(loading(true));
    await dispatch(getGameName(name));
    dispatch(loading(false));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a name..."
          onChange={handleChange}
        />
        <button type="submit" value="submit">
          Search
        </button>
      </form>
    </div>
  );
}
