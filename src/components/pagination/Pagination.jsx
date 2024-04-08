import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentPage } from "@/lib/features/pageSlice";
import "../../app/css/pagination.css";

export default function Pagination() {
  const dispatch = useAppDispatch();
  const { page, currentPage } = useAppSelector((state) => state.pageReducer);
  var pagesArr = [];
  for (let i = 0; i < page; i++) {
    pagesArr.push({ id: i });
  }
  const handleClick = (e) => {
    dispatch(setCurrentPage(e.target.value));
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  return (
    <div className="content-pagination">
      {pagesArr.length > 0 &&
        pagesArr.map((el) => {
          let color;
          if (el.id.toString() === currentPage.toString()) color = "grey";
          else {
            color = "white";
          }
          return (
            <button
              onClick={handleClick}
              key={el.id}
              value={el.id}
              className="button-pagination"
              style={{ backgroundColor: `${color}` }}
            >
              {el.id + 1}
            </button>
          );
        })}
    </div>
  );
}
