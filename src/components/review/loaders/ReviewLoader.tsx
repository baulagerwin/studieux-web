import JumbotronLoader from "../../common/jumbotron/loader/JumbotronLoader";
import SearchLoader from "../../common/search/loader/SearchLoader";
import SlideShowLoader from "../../common/slideshow/loader/SlideShowLoader";

function ReviewLoader() {
  return (
    <div className="u__navbar--offset">
      <div className="review-loader">
        <JumbotronLoader />
        <SearchLoader />
        <>
          <SlideShowLoader />
          <SlideShowLoader />
          <SlideShowLoader />
        </>
      </div>
    </div>
  );
}

export default ReviewLoader;
