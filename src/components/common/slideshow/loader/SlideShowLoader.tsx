function SlideShowLoader() {
  return (
    <div className="slideshow-loader u__animation--pulse">
      <div className="slideshow-loader__header">
        <span></span>
        <div></div>
      </div>
      <div className="slideshow-loader__window">
        <div className="slideshow-loader__list">
          <div className="slideshow-loader__item"></div>
          <div className="slideshow-loader__item"></div>
          <div className="slideshow-loader__item"></div>
          <div className="slideshow-loader__item"></div>
          <div className="slideshow-loader__item"></div>
        </div>
      </div>
    </div>
  );
}

export default SlideShowLoader;
