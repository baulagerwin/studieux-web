import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NotebookDto from "../dto/NotebookDto";
import useFields from "../../../hooks/useFields";
import useHttp from "../../../hooks/useHttp";
import INotebook from "../model/INotebook";
import keys from "../../../react-query/keys";
import notebookService from "../../../services/notebookService";
import validate from "../../../utils/validate";
import NotebookFields from "../types/NotebookFields";

function useCreateNotebook(
  onClosePopUp: () => void
): [
  NotebookFields,
  () => void,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.FormEvent) => void,
  boolean
] {
  const { mutate, isError, isLoading, errorMessage, isSuccess } = useHttp<
    NotebookDto,
    INotebook
  >(notebookService.post, keys.notebooks);

  const initialFields = {
    notebook: {
      value: "",
      error: "",
    },
  };

  const [performedHttp, setPerformedHttp] = useState(false);
  const [fields, setFields, animateFields, onNotebookChange] =
    useFields<NotebookFields>(initialFields);

  const preSubmitFields = {
    notebook: {
      ...fields.notebook,
      error: "",
    },
  };

  const clientValidationFields = {
    notebook: {
      ...fields.notebook,
      error: validate.notebook(fields.notebook.value),
    },
  };

  const serverValidationField = {
    notebook: {
      ...fields.notebook,
      error: errorMessage,
    },
  };

  function serverSideValidation(notebook: NotebookDto) {
    mutate(notebook);
    setPerformedHttp(true);
  }

  function serverSideValidationFailed() {
    return isError && performedHttp;
  }

  // Submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const notebook: NotebookDto = {
      name: fields.notebook.value,
    };

    let clientSideValidationFailed = validate.notebook(fields.notebook.value);
    if (clientSideValidationFailed)
      return animateFields(preSubmitFields, clientValidationFields);

    serverSideValidation(notebook);
  }

  // When fails
  if (serverSideValidationFailed()) {
    animateFields(preSubmitFields, serverValidationField);
    setPerformedHttp(false);
  }

  // When succeeds
  useEffect(() => {
    if (isSuccess) {
      toast.success(`${fields.notebook.value} has been successfully added.`);
      closeFields();
    }
  }, [isSuccess]);

  function closeFields() {
    setFields({
      notebook: {
        value: "",
        error: "",
      },
    });
    onClosePopUp();
  }

  return [fields, closeFields, onNotebookChange, handleSubmit, isLoading];
}

export default useCreateNotebook;
