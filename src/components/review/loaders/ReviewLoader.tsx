import SlideShowLoader from "../../common/slideshow/loader/SlideShowLoader";

function ReviewLoader() {
  return (
    <div className="u__navbar--offset">
      <div className="container">
        <div className="review-loader u__animation--pulse">
          <div className="review-loader__jumbotron"></div>
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
