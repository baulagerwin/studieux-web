function NotebooksLoader() {
  return (
    <div className="u__navbar--offset">
      <div className="container">
        <div className="notebooks-loader u__animation--pulse">
          <div className="jumbotron"></div>
          <div className="search-and-create">
            <div className="search-and-create__search"></div>
            <div className="search-and-create__create"></div>
          </div>
          <ul className="groups grid grid-col-4 gap-4">
            <li className="groups__item"></li>
            <li className="groups__item"></li>
            <li className="groups__item"></li>
            <li className="groups__item"></li>
            <li className="groups__item"></li>
            <li className="groups__item"></li>
            <li className="groups__item"></li>
            <li className="groups__item"></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotebooksLoader;
