import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useHttp from "../../../hooks/useHttp";
import INotebook from "../model/INotebook";
import keys from "../../../react-query/keys";
import notebookService from "../../../services/notebookService";

export interface DeleteNotebook {
  notebook: INotebook;
  closeFields: () => void;
  handleOnSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

function useDeleteNotebook(
  notebook: INotebook,
  onActivePopUp: (value: string) => void
) {
  const navigate = useNavigate();
  const { mutate, data, isLoading, isError, error, errorMessage, isSuccess } =
    useHttp(notebookService.delete, keys.notebooks);

  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(notebook._id);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${notebook.name} has been successfully deleted.`);
      navigate(-1);
    }
  }, [isSuccess]);

  function closeFields() {
    onActivePopUp("");
  }

  return { notebook, closeFields, handleOnSubmit, isLoading };
}

export default useDeleteNotebook;
