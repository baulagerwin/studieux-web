import JumbotronLoader from "../../common/jumbotron/loader/JumbotronLoader";
import SlideShowLoader from "../../common/slideshow/loader/SlideShowLoader";

function ReviewLoader() {
  return (
    <div className="u__navbar--offset">
      <div className="container">
        <div className="review-loader">
          <JumbotronLoader />
          <div className="review-loader__search"></div>
          <SlideShowLoader />
          <SlideShowLoader />
          <SlideShowLoader />
        </div>
      </div>
    </div>
  );
}

export default ReviewLoader;
