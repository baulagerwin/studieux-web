import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import keys from "../../../react-query/keys";
import notebookService from "../../../services/notebookService";
import INotebook from "../model/INotebook";
import NotebookFields from "../types/NotebookFields";
import useActivePopUp from "./useActivePopUp";
import useCreateNotebook from "./useCreateNotebook";
import useSearch from "../../../hooks/useSearch";

function useNotebooks(): [
  string,
  (value: string) => void,
  () => void,
  NotebookFields,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.FormEvent) => void,
  boolean,
  string,
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  boolean,
  boolean,
  INotebook[]
] {
  const [searchParams] = useSearchParams();
  const [activePopUp, onActivePopUp] = useActivePopUp();

  function handleClosePopUp() {
    onActivePopUp("");
  }

  const [
    fields,
    closeFields,
    onNotebookChange,
    onSubmit,
    isCreateNotebookLoading,
  ] = useCreateNotebook(handleClosePopUp);

  const [search, debouncedSearch, onSearchChange] = useSearch("q", "");

  const {
    data: notebooks = [],
    isLoading: isNotebooksLoading,
    isFetching: isNotebooksFetching,
  } = useQuery(
    [keys.notebooks, debouncedSearch],
    () => notebookService.get(searchParams.toString()),
    {
      keepPreviousData: true,
    }
  );

  return [
    activePopUp,
    onActivePopUp,
    closeFields,
    fields,
    onNotebookChange,
    onSubmit,
    isCreateNotebookLoading,
    search,
    debouncedSearch,
    onSearchChange,
    isNotebooksLoading,
    isNotebooksFetching,
    notebooks,
  ];
}

export default useNotebooks;
