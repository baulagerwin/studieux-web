import { useSearchParams } from "react-router-dom";

function useSortBy(
  key: string,
  initialSortBy: string
): [string, (value: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortKey = key;
  const sortBy = searchParams.get(sortKey) || initialSortBy;

  function handleSortBy(value: string) {
    if (value === initialSortBy) {
      searchParams.delete(sortKey);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(sortKey, value);
    setSearchParams(searchParams);
  }

  return [sortBy, handleSortBy];
}

export default useSortBy;
