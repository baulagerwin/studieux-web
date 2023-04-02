import { useSearchParams } from "react-router-dom";
import useDebounce from "./useDebounce";

function useSearch(
  key: string,
  initialSearch: string
): [string, string, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const searchKey = key;
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get(searchKey) || initialSearch;
  const debouncedSearch = useDebounce<string>(search, 400);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      searchParams.delete(searchKey);
      setSearchParams(searchParams);
      return;
    }

    searchParams.delete("pageSize");
    searchParams.delete("page");
    searchParams.set(searchKey, e.target.value.toLowerCase());
    setSearchParams(searchParams);
  }

  return [search, debouncedSearch, handleSearchChange];
}

export default useSearch;
