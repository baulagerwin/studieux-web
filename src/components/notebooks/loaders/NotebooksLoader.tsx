import BoxesLoader from "../../common/boxes/loader/BoxesLoader";
import MiniLoader from "../../common/button/loader/MiniLoader";
import JumbotronLoader from "../../common/jumbotron/loader/JumbotronLoader";
import SearchLoader from "../../common/search/loader/SearchLoader";

function NotebooksLoader() {
  return (
    <div className="u__navbar--offset">
      <div className="container">
        <div className="notebooks-loader">
          <JumbotronLoader />
          <div className="search-and-create">
            <SearchLoader />
            <MiniLoader />
          </div>
          <BoxesLoader />
        </div>
      </div>
    </div>
  );
}

export default NotebooksLoader;
