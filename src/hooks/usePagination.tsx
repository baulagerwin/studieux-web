import { useSearchParams } from "react-router-dom";

function usePagination(
  key: string,
  initialPage: number,
  pageSizeKey: string,
  initialPageSize: number
): [number, (value: number) => void, number] {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageKey = key;

  const pageSize = Number(searchParams.get(pageSizeKey)) || initialPageSize;
  const page = Number(searchParams.get(pageKey)) || initialPage;

  function handlePageChange(value: number) {
    if (value === initialPage) {
      searchParams.delete(pageKey);
      searchParams.delete(pageSizeKey);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(pageSizeKey, pageSize.toString());
    searchParams.set(pageKey, value.toString());
    setSearchParams(searchParams);
  }

  return [page, handlePageChange, pageSize];
}

export default usePagination;
