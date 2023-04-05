import { useSearchParams } from "react-router-dom";

function useFilterBy(
  key: string,
  initialFilter: string
): [string, (value: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterKey = key;
  const filterBy = searchParams.get(filterKey) || initialFilter;

  function handleFilterBy(value: string) {
    if (value === initialFilter) {
      searchParams.delete(filterKey);
      setSearchParams(searchParams);
      return;
    }

    searchParams.delete("pageSize");
    searchParams.delete("page");
    searchParams.set(filterKey, value);
    setSearchParams(searchParams);
  }

  return [filterBy, handleFilterBy];
}

export default useFilterBy;
