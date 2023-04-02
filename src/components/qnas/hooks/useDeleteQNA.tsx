import { useEffect } from "react";
import { toast } from "react-toastify";
import useHttp from "../../../hooks/useHttp";
import keys from "../../../react-query/keys";
import qnaService from "../../../services/qnaService";

function useDeleteQNA(
  qnaId: string,
  onClosePopUp: () => void
): [() => void, (e: React.FormEvent) => void, boolean] {
  const { mutate, data, isLoading, isError, error, errorMessage, isSuccess } =
    useHttp(qnaService.delete, keys.qnas);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(qnaId);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Question and answer has been successfully deleted.`);
      close();
    }
  }, [isSuccess]);

  function close() {
    onClosePopUp();
  }

  return [close, handleSubmit, isLoading];
}

export default useDeleteQNA;
