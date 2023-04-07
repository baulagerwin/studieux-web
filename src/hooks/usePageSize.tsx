import { useSearchParams } from "react-router-dom";

function usePageSize(key: string, initialPageSize: number): number {
  const [searchParams] = useSearchParams();

  const pageSize = Number(searchParams.get(key)) || initialPageSize;

  return pageSize;
}

export default usePageSize;
