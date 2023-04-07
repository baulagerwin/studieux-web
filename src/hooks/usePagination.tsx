import { useSearchParams } from "react-router-dom";

function usePagination(pageSize: number): [number, (value: number) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = 1;
  const key = "page";
  const page = Number(searchParams.get(key)) || initialPage;
  const pagegSizeKey = "pageSize";

  function handlePageChange(value: number) {
    if (value === initialPage) {
      searchParams.delete(pagegSizeKey);
      searchParams.delete(key);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(pagegSizeKey, pageSize.toString());
    searchParams.set(key, value.toString());
    setSearchParams(searchParams);
  }

  return [page, handlePageChange];
}

export default usePagination;
