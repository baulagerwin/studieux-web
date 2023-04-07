import { useQuery } from "react-query";
import keys from "../../../react-query/keys";
import notebookService from "../../../services/notebookService";
import INotebook from "../model/INotebook";

function useGetNotebooks(queryString: string): {
  data: INotebook[];
  isLoading: boolean;
  isFetching: boolean;
} {
  const fallback: INotebook[] = [];
  const {
    data = fallback,
    isLoading,
    isFetching,
  } = useQuery(
    [keys.notebooks, queryString],
    () => notebookService.get(queryString),
    {
      keepPreviousData: true,
    }
  );

  return { data, isLoading, isFetching };
}

export default useGetNotebooks;
