import NotebooksLoader from "./loaders/NotebooksLoader";
import background from "../../assets/notebooks.png";
import Search from "../common/search/Search";
import Jumbotron from "../common/jumbotron/Jumbotron";
import NotebookForm from "./form/NotebookForm";
import popUpFormKeys from "./popups/popUpKeys";
import Empty from "../common/empty/Empty";
import ZeroResults from "../common/zeroResults/ZeroResults";
import Mini from "../common/button/Mini";
import Boxes from "../common/boxes/Boxes";
import BoxesLoader from "../common/boxes/loader/BoxesLoader";
import { useState } from "react";
import useSearch from "../../hooks/useSearch";
import { useSearchParams } from "react-router-dom";
import useNotebooks from "./hooks/useNotebooks";

function Notebooks() {
  const [searchParams] = useSearchParams();
  const [activePopUp, setActivePopUp] = useState("");
  const [search, debouncedSearch, onSearchChange] = useSearch("q", "");
  const notebooks = useNotebooks("", searchParams.toString(), setActivePopUp);

  if (notebooks.items.isLoading) return <NotebooksLoader />;

  return (
    <>
      {activePopUp === popUpFormKeys.addNotebook && (
        <NotebookForm
          type={popUpFormKeys.addNotebook}
          fields={notebooks.createNotebook.fields}
          onChange={notebooks.createNotebook.handleOnChange}
          onSubmit={notebooks.createNotebook.handleOnSubmit}
          isLoading={notebooks.createNotebook.isLoading}
          onCloseNotebook={notebooks.createNotebook.closeFields}
        />
      )}
      <div className="u__navbar--offset">
        <div className="container">
          <div className={`notebooks`}>
            <Jumbotron label="Notebooks" x={60} y={40} imagePath={background} />
            <div className="search-and-create">
              <Search
                field={search}
                onChange={onSearchChange}
                isLoading={notebooks.items.isFetching}
              />
              <Mini
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={4}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                }
                onOpen={() => setActivePopUp(popUpFormKeys.addNotebook)}
              />
            </div>
            {Boolean(!notebooks.items.data.length) &&
              Boolean(!debouncedSearch.length) && <Empty item="notebook" />}
            {Boolean(notebooks.items.data.length) &&
              !notebooks.items.isFetching && (
                <Boxes notebooks={notebooks.items.data} />
              )}
            {Boolean(notebooks.items.data.length) &&
              notebooks.items.isFetching && <BoxesLoader />}
            {Boolean(!notebooks.items.data.length) &&
              Boolean(debouncedSearch.length) && <ZeroResults />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notebooks;
