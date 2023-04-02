import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useHttp from "../../../hooks/useHttp";
import INotebook from "../model/INotebook";
import keys from "../../../react-query/keys";
import notebookService from "../../../services/notebookService";

function useDeleteNotebook(
  notebook: INotebook,
  onClosePopUp: () => void
): [() => void, (e: React.FormEvent) => void, boolean] {
  const navigate = useNavigate();
  const { mutate, data, isLoading, isError, error, errorMessage, isSuccess } =
    useHttp(notebookService.delete, keys.notebook);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(notebook._id);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${notebook.name} has been successfully deleted.`);
      navigate(-1);
    }
  }, [isSuccess]);

  function close() {
    onClosePopUp();
  }

  return [close, handleSubmit, isLoading];
}

export default useDeleteNotebook;
