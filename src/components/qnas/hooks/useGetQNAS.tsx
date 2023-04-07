import { useQuery } from "react-query";
import keys from "../../../react-query/keys";
import qnaService from "../../../services/qnaService";
import IQNA from "../../../models/IQNA";

function useGetQNAS(notebookId: string, queryString: string) {
  const fullQueryString = `notebookId=${notebookId}&${queryString}`;
  const fallback: IQNA[] = [];
  const {
    data = fallback,
    isLoading,
    isFetching,
  } = useQuery(
    [keys.qnas, notebookId, queryString],
    () => qnaService.get(fullQueryString),
    {
      keepPreviousData: true,
    }
  );

  return { data, isLoading, isFetching };
}

export default useGetQNAS;
