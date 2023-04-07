import Jumbotron from "../common/jumbotron/Jumbotron";
import review from "../../assets/review.png";
import Search from "../common/search/Search";
import Slideshow from "../common/slideshow/Slideshow";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Empty from "../common/empty/Empty";
import ReviewLoader from "./loaders/ReviewLoader";
import SlideShowLoader from "../common/slideshow/loader/SlideShowLoader";
import { useQuery } from "react-query";
import keys from "../../react-query/keys";
import reviewService from "../../services/reviewService";
import { useEffect, useRef, useState } from "react";
import IQNA from "../../models/IQNA";
import useSearch from "../../hooks/useSearch";
import ZeroResults from "../common/zeroResults/ZeroResults";
import validateObjectId from "../../utils/validateObjectId";
import ReviewPopups from "./popups/ReviewPopups";

function Review() {
  const params = useParams();
  let notebookId = params.notebookId as string;

  if (!validateObjectId(notebookId)) return <Navigate to="*" />;

  const [searchParams] = useSearchParams();
  const [search, debouncedSearch, onSearchChange] = useSearch("q", "");

  const pageSize = 3;
  const [page, setPage] = useState(1);

  const slideShows = useRef<{ topic: string; qnas: IQNA[] }[]>([]);
  const [items, setItems] = useState<{ topic: string; qnas: IQNA[] }[]>([]);
  const searchQueryString = searchParams.toString()
    ? searchParams.toString() + "&"
    : "";
  const queryString = searchQueryString + `page=${page}&pageSize=${pageSize}`;

  const { data, isLoading, isFetching } = useQuery(
    [keys.reviews, notebookId, queryString],
    () => reviewService.get(notebookId, queryString),
    {
      keepPreviousData: true,
    }
  );

  const isScrolled = useRef(false);
  const isSearched = useRef(false);

  useEffect(() => {
    if (isLoading) return;

    if (isScrolled.current) {
      slideShows.current = [...slideShows.current, ...data.results];
      isScrolled.current = false;
      setItems(slideShows.current);
      return;
    }

    if (isSearched.current) {
      slideShows.current = data.results;
      isSearched.current = false;
      setItems(slideShows.current);
      return;
    }

    slideShows.current = [];
    slideShows.current = [...slideShows.current, ...data.results];
    setItems(slideShows.current);
    return;
  }, [data]);

  const [activePopUp, setActivePopUp] = useState("");
  const [qna, setQna] = useState<IQNA>({
    _id: "",
    topic: {
      _id: "",
      name: "",
    },
    question: "",
    answer: "",
  });
  const [qnas, setQnas] = useState<IQNA[]>([]);

  function closePopUp() {
    setActivePopUp("");
    setQna({
      _id: "",
      topic: {
        _id: "",
        name: "",
      },
      question: "",
      answer: "",
    });
    setQnas([]);
  }

  useEffect(() => {
    if (Boolean(activePopUp)) {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "visible";
      };
    }
  });

  if (isLoading) return <ReviewLoader />;

  return (
    <>
      <div className="u__navbar--offset">
        <div key={notebookId} className="review">
          <ReviewPopups
            activePopUp={activePopUp}
            card={qna}
            cards={qnas}
            onClose={closePopUp}
          />
          <div className="u__margin--right">
            <Jumbotron label="Review" x={0} y={50} imagePath={review} />
          </div>
          <div className="u__margin--right">
            <Search
              field={search}
              onChange={(e) => {
                isSearched.current = true;
                setPage(1);
                onSearchChange(e);
              }}
              isLoading={isFetching}
            />
          </div>
          {Boolean(!items.length) && !Boolean(search) && (
            <Empty item="topics to review" />
          )}
          {Boolean(items.length) && (
            <InfiniteScroll
              next={() => {
                isScrolled.current = true;
                setPage(page + 1);
              }}
              hasMore={items.length < data.count}
              loader={
                <div className="u__load-more--margin">
                  <SlideShowLoader />
                  <SlideShowLoader />
                  <SlideShowLoader />
                </div>
              }
              dataLength={items.length}
              scrollThreshold={1}
            >
              {Boolean(items.length) &&
                items.map((slideShow: { topic: string; qnas: IQNA[] }) => (
                  <Slideshow
                    key={slideShow.topic}
                    item={slideShow}
                    onActivePopUp={setActivePopUp}
                    onChangeQna={setQna}
                    onChangeQnas={setQnas}
                  />
                ))}
            </InfiniteScroll>
          )}
          {Boolean(!items.length) && Boolean(search) && <ZeroResults />}
        </div>
      </div>
    </>
  );
}

export default Review;
