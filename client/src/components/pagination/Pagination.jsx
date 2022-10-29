import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions";

export default function Pagination() {
  const dispatch = useDispatch();
  const { pages, currentPage } = useSelector((state) => state);
  var pagesArr = [];
  console.log(pages);
  for (let i = 0; i < pages; i++) {
    pagesArr.push({ id: i });
  }
  const handleClick = (e) => {
    dispatch(setCurrentPage(e.target.value));
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  return (
    <div>
      {pagesArr.length > 0 &&
        pagesArr.map((el) => {
          return (
            <button onClick={handleClick} key={el.id} value={el.id}>
              {el.id + 1}
            </button>
          );
        })}
    </div>
  );
}
