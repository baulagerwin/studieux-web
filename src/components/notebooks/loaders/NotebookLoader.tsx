function NotebookLoader() {
  return (
    <div className="u__navbar--offset">
      <div className="container">
        <div className="notebook-loader u__animation--pulse">
          <div className="jumbotron"></div>
          <div className="notebook-loader__filters">
            <div className="notebook-loader__search"></div>
            <div className="notebook-loader__edit"></div>
            <div className="notebook-loader__delete"></div>
            <div className="notebook-loader__filter-by"></div>
            <div className="notebook-loader__sort-by"></div>
            <div className="notebook-loader__mini-menu"></div>
          </div>
          <hr className="notebook-loader__hr" />
          <div className="notebook-loader__details">
            <div className="notebook-loader__details--desktop"></div>
            <div className="notebook-loader__details--mobile"></div>
            <div className="notebook-loader__pagination"></div>
          </div>
          <div className="notebook-loader__accordion">
            <div className="notebook-loader__accordion-item"></div>
            <div className="notebook-loader__accordion-item"></div>
            <div className="notebook-loader__accordion-item"></div>
            <div className="notebook-loader__accordion-item"></div>
            <div className="notebook-loader__accordion-item"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotebookLoader;
