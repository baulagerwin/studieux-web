import noResults from "../../../assets/no-results.png";

function ZeroResults() {
  return (
    <div className="zero-results">
      <div className="zero-results__box">
        <img src={noResults} alt="No Results" />
      </div>
      <h3>No results found.</h3>
      <p>We couldn't find what you're looking for.</p>
      <p>Try searching again.</p>
    </div>
  );
}

export default ZeroResults;
