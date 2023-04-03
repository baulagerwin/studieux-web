import NotebooksLoader from "./loaders/NotebooksLoader";
import background from "../../assets/notebooks.png";
import Search from "../common/search/Search";
import Jumbotron from "../common/jumbotron/Jumbotron";
import NotebookForm from "./form/NotebookForm";
import useNotebooks from "./hooks/useNotebooks";
import popUpFormKeys from "./popups/popUpKeys";
import Empty from "../common/empty/Empty";
import ZeroResults from "../common/zeroResults/ZeroResults";
import Mini from "../common/button/Mini";
import Boxes from "../common/boxes/Boxes";
import BoxesLoader from "../common/boxes/loader/BoxesLoader";

function Notebooks() {
  const [
    activePopUp,
    onActivePopUp,
    closeFields,
    fields,
    onNotebookChange,
    onSubmit,
    isCreateNotebookLoading,
    search,
    debouncedSearch,
    onSearchChange,
    isNotebooksLoading,
    isNotebooksFetching,
    notebooks,
  ] = useNotebooks();

  if (isNotebooksLoading) return <NotebooksLoader />;

  return (
    <>
      {activePopUp === popUpFormKeys.addNotebook && (
        <NotebookForm
          type={popUpFormKeys.addNotebook}
          fields={fields}
          onChange={onNotebookChange}
          onSubmit={onSubmit}
          isLoading={isCreateNotebookLoading}
          onCloseNotebook={closeFields}
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
                isLoading={isNotebooksFetching}
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
                onOpen={() => onActivePopUp(popUpFormKeys.addNotebook)}
              />
            </div>
            {Boolean(!notebooks.length) && Boolean(!debouncedSearch.length) && (
              <Empty item="notebook" />
            )}
            {Boolean(notebooks.length) && !isNotebooksFetching && (
              <Boxes notebooks={notebooks} />
            )}
            {Boolean(notebooks.length) && isNotebooksFetching && (
              <BoxesLoader />
            )}
            {/* {Boolean(notebooks.length) && <Boxes notebooks={notebooks} />} */}
            {Boolean(!notebooks.length) && Boolean(debouncedSearch.length) && (
              <ZeroResults />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notebooks;
