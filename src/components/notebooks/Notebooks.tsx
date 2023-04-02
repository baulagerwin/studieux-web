import { Link } from "react-router-dom";
import INotebook from "./model/INotebook";
import NotebooksLoader from "./loaders/NotebooksLoader";
import background from "../../assets/notebooks.png";
import Search from "../common/search/Search";
import Add from "../common/button/Add";
import Jumbotron from "../common/jumbotron/Jumbotron";
import NotebookForm from "./form/NotebookForm";
import useNotebooks from "./hooks/useNotebooks";
import popUpFormKeys from "./popups/popUpKeys";
import Empty from "../common/empty/Empty";
import ZeroResults from "../common/zeroResults/ZeroResults";

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
              <Search field={search} onChange={onSearchChange} />
              <Add onOpen={() => onActivePopUp(popUpFormKeys.addNotebook)} />
            </div>
            {Boolean(!notebooks.length) && Boolean(!debouncedSearch.length) && (
              <Empty item="notebook" />
            )}
            {Boolean(notebooks.length) && (
              <ul className="notebooks__group grid grid-col-4 gap-4">
                {notebooks.map((notebook: INotebook) => {
                  return (
                    <li key={notebook._id} className="notebooks__item">
                      <Link
                        className="notebooks__link"
                        to={`/notebooks/${notebook._id}`}
                      >
                        {notebook.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
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
