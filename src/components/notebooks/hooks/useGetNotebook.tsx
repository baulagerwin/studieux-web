import { useQuery } from "react-query";
import INotebook from "../model/INotebook";
import keys from "../../../react-query/keys";
import notebookService from "../../../services/notebookService";

function useGetNotebook(notebookId: string): {
  data: INotebook;
  isLoading: boolean;
  isFetching: boolean;
} {
  const fallback: INotebook = { _id: "", name: "" };
  const {
    data = fallback,
    isLoading,
    isFetching,
  } = useQuery([keys.notebook, notebookId], () =>
    notebookService.getNotebook(notebookId)
  );

  return { data, isLoading, isFetching };
}

export default useGetNotebook;
