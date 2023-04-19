import { useEffect } from "react";
import { toast } from "react-toastify";
import useHttp from "../../../hooks/useHttp";
import keys from "../../../react-query/keys";
import qnaService from "../../../services/qnaService";
import IQNA from "../../../models/IQNA";
import queryClient from "../../../react-query/queryClient";

export interface DeleteQNA {
  qna: IQNA;
  closeFields: () => void;
  handleOnSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

function useDeleteQNA(
  qna: IQNA,
  onActivePopUp: (value: string) => void
): DeleteQNA {
  const { mutate, data, isLoading, isError, error, errorMessage, isSuccess } =
    useHttp(qnaService.delete, [keys.qnas]);

  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(qna._id);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Question and answer has been successfully deleted.`);
      closeFields();
    }
  }, [isSuccess]);

  function closeFields() {
    onActivePopUp("");
  }

  return { qna, closeFields, handleOnSubmit, isLoading };
}

export default useDeleteQNA;
