import blackboard from "../../assets/blackboard.png";
import Search from "../common/search/Search";
import Edit from "../common/button/Edit";
import Delete from "../common/button/Delete";
import Jumbotron from "../common/jumbotron/Jumbotron";
import useNotebook from "./hooks/useNotebook";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [sortBy, onSortBy] = useSortBy("sortKey", "A - Z");
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
              />
              <Edit onOpen={() => onActivePopUp(popUpKeys.editNotebook)} />
              <Delete onOpen={() => onActivePopUp(popUpKeys.deleteNotebook)} />
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
              <p className="notebook__details--desktop">{`There are ${
                qna.qnas.count
              } questions and answer in ${filterBy.toLowerCase()}`}</p>
              <p className="notebook__details--mobile">{`Questions(${qna.qnas.count})`}</p>
              <Pagination
                isXOpen={isPaginationOpen}
                onXOpen={(value: boolean) => setPaginationOpen(value)}
                currentPage={Boolean(qna.qnas.results.length) ? page : 0}
                onCurrentPage={(value: number) => onPageChange(value)}
                onPrevPage={prevPage}
                onNextPage={nextPage}
                pages={pages}
              />
            </div>
            {Boolean(!qna.qnas.results.length) && !Boolean(search) && (
              <Empty item="question and answer" />
            )}
            {Boolean(qna.qnas.results.length) && (
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
