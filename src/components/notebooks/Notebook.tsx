import blackboard from "../../assets/blackboard.png";
import Search from "../common/search/Search";
import Jumbotron from "../common/jumbotron/Jumbotron";
import useNotebook from "./hooks/useNotebook";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import popUpKeys from "./popups/popUpKeys";
import NotebookPopUps from "./popups/NotebookPopUps";
import FilterBy from "../common/filterBy/FilterBy";
import MiniMenu from "../common/miniMenu/MiniMenu";
import Pagination from "../common/pagination/Pagination";
import Accordion from "../common/accordion/Accordion";
import DropDownMenu from "../common/dropDownMenu/DropDownMenu";
import Empty from "../common/empty/Empty";
import ZeroResults from "../common/zeroResults/ZeroResults";
import useSearch from "../../hooks/useSearch";
import useFilter from "../../hooks/useFilterBy";
import useSortBy from "../../hooks/useSortBy";
import getPages from "../../utils/getPages";
import usePagination from "../../hooks/usePagination";
import NotebookLoader from "./loaders/NotebookLoader";
import validateObjectId from "../../utils/validateObjectId";
import Mini from "../common/button/Mini";
import AccordionLoader from "../common/accordion/loader/AccordionLoader";
import Details from "../common/details/Details";

function Notebook() {
  const params = useParams();
  const navigate = useNavigate();

  let id = params.notebookId as string;

  if (!validateObjectId(id)) return <Navigate to="*" />;

  const [
    activePopUp,
    onActivePopUp,
    notebook,
    notebookForm,
    topic,
    topicForm,
    qna,
    qnaForm,
  ] = useNotebook(id);

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, debouncedSearch, onSearchChange] = useSearch("q", "");
  const [filterBy, onFilterBy] = useFilter("filterBy", "All Topics");
  const [sortBy, onSortBy] = useSortBy("sortBy", "A - Z");
  const [page, onPageChange, pageSize] = usePagination(
    "page",
    1,
    "pageSize",
    5
  );

  const [isSortByOpen, setSortByOpen] = useState(false);
  const [isFilterByOpen, setFilterByOpen] = useState(false);
  const [isMiniMenuOpen, setMiniMenuOpen] = useState(false);
  const [isPaginationOpen, setPaginationOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", closeAll);

    return () => document.removeEventListener("click", closeAll);
  }, []);

  function closeAll() {
    setSortByOpen(false);
    setFilterByOpen(false);
    setMiniMenuOpen(false);
    setPaginationOpen(false);
  }

  if (notebook.isLoading || topic.isLoading || qna.isLoading)
    return <NotebookLoader />;

  const pages = getPages(pageSize, qna.qnas.count);

  function nextPage() {
    if (page >= pages.length) return;

    onPageChange(page + 1);
  }

  function prevPage() {
    const startingPage = 1;
    if (page <= startingPage) return;

    onPageChange(page - 1);
  }

  return (
    <>
      <NotebookPopUps
        activePopUp={activePopUp}
        notebookForm={notebookForm}
        topicForm={topicForm}
        qnaForm={qnaForm}
      />
      <div className="u__navbar--offset">
        <div className="container">
          <div className="notebook">
            <Jumbotron
              label={notebook.data.name}
              x={8}
              y={92}
              imagePath={blackboard}
            />
            <div className="notebook__filters">
              <Search
                field={search}
                cN="notebook__search"
                onChange={(e) => {
                  searchParams.delete("pageSizeKey");
                  searchParams.delete("page");
                  setSearchParams(searchParams);
                  onSearchChange(e);
                }}
                isLoading={false}
              />
              <Mini
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                }
                onOpen={() => onActivePopUp(popUpKeys.editNotebook)}
              />
              <Mini
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                }
                onOpen={() => onActivePopUp(popUpKeys.deleteNotebook)}
              />
              <FilterBy
                label={""}
                cN="notebook__filter-by"
                isXOpen={isFilterByOpen}
                onXOpen={setFilterByOpen}
                xBy={filterBy}
                onXBy={(value: string) => {
                  searchParams.delete("pageSizeKey");
                  searchParams.delete("page");
                  setSearchParams(searchParams);
                  onFilterBy(value);
                }}
                limitLength={4}
                allItems={{
                  _id: "allFilter",
                  name: "All Topics",
                }}
                items={topic.topics}
                onSwipeRight={(item) => {
                  topic.initializer(item);
                  onActivePopUp(popUpKeys.editTopic);
                }}
                onSwipeLeft={(item) => {
                  topic.initializer(item);
                  onActivePopUp(popUpKeys.deleteTopic);
                }}
              />
              <DropDownMenu
                label={"Order by:"}
                cN="notebook__sort-by"
                xBy={sortBy}
                onXBy={onSortBy}
                isXOpen={isSortByOpen}
                onXOpen={setSortByOpen}
                items={[
                  { _id: "1", name: "A - Z" },
                  { _id: "2", name: "Z - A" },
                  { _id: "3", name: "Oldest" },
                  { _id: "4", name: "Newest" },
                ]}
                limitLength={5}
              />
              <MiniMenu
                cN="notebook__mini-menu"
                isXOpen={isMiniMenuOpen}
                onXOpen={setMiniMenuOpen}
                items={[
                  {
                    _id: "addTopic",
                    name: "Add topic",
                    whenClicked: () => {
                      onActivePopUp(popUpKeys.addTopic);
                      setMiniMenuOpen(false);
                    },
                  },
                  {
                    _id: "addQNA",
                    name: "Add Q & A",
                    whenClicked: () => {
                      onActivePopUp(popUpKeys.addQNA);
                      setMiniMenuOpen(false);
                    },
                  },
                  {
                    _id: "review",
                    name: "Review",
                    whenClicked: () => {
                      navigate(`/review/${id}`);
                    },
                  },
                ]}
              />
            </div>
            <hr />
            <div className="notebook__details">
              <Details count={qna.qnas.count} filterBy={filterBy} />
              <Pagination
                isXOpen={isPaginationOpen}
                onXOpen={(value: boolean) => setPaginationOpen(value)}
                currentPage={Boolean(qna.qnas.results.length) ? page : 0}
                onCurrentPage={(value: number) => {
                  onPageChange(value);
                }}
                onPrevPage={prevPage}
                onNextPage={nextPage}
                pages={pages}
              />
            </div>
            {Boolean(!qna.qnas.results.length) && !Boolean(search) && (
              <Empty item="question and answer" />
            )}
            {Boolean(qna.qnas.results.length) && !qna.isFetching && (
              <Accordion
                items={qna.qnas.results}
                onSwipeRight={(item) => {
                  onActivePopUp(popUpKeys.editQNA);
                  qna.initializer(item);
                }}
                onSwipeLeft={(item) => {
                  onActivePopUp(popUpKeys.deleteQNA);
                  qna.initializer(item);
                }}
              />
            )}
            {Boolean(qna.qnas.results.length) && qna.isFetching && (
              <AccordionLoader />
            )}
            {Boolean(!qna.qnas.results.length) && Boolean(search) && (
              <ZeroResults />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notebook;
