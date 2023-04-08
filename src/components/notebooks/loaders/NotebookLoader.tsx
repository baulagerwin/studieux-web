import AccordionLoader from "../../common/accordion/loader/AccordionLoader";
import MiniLoader from "../../common/button/loader/MiniLoader";
import DetailsLoader from "../../common/details/loader/DetailsLoader";
import DropDownMenuLoader from "../../common/dropDownMenu/loader/DropDownMenuLoader";
import JumbotronLoader from "../../common/jumbotron/loader/JumbotronLoader";
import PaginationLoader from "../../common/pagination/loader/PaginationLoader";
import SearchLoader from "../../common/search/loader/SearchLoader";

function NotebookLoader() {
  return (
    <div className="u__navbar--offset">
      <div className="container">
        <div className="notebook-loader">
          <JumbotronLoader />
          <div className="notebook-loader__filters">
            <div className="notebook-loader__search">
              <SearchLoader />
            </div>
            <MiniLoader />
            <MiniLoader />
            <div className="notebook-loader__filter-by">
              <DropDownMenuLoader />
            </div>
            <div className="notebook-loader__sort-by">
              <DropDownMenuLoader />
            </div>
            <div className="notebook-loader__mini-menu">
              <MiniLoader />
            </div>
          </div>
          <hr className="notebook-loader__hr" />
          <div className="notebook-loader__details">
            <DetailsLoader />
            <PaginationLoader />
          </div>
          <AccordionLoader />
        </div>
      </div>
    </div>
  );
}

export default NotebookLoader;
