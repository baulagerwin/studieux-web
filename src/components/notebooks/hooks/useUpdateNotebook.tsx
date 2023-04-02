import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NotebookDto from "../dto/NotebookDto";
import useFields from "../../../hooks/useFields";
import useHttp from "../../../hooks/useHttp";
import INotebook from "../model/INotebook";
import keys from "../../../react-query/keys";
import notebookService, {
  NotebookPutDto,
} from "../../../services/notebookService";
import validate from "../../../utils/validate";
import NotebookFields from "../types/NotebookFields";

function useUpdateNotebook(
  notebook: INotebook,
  onClosePopUp: () => void
): [
  NotebookFields,
  () => void,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.FormEvent) => void,
  boolean
] {
  const { mutate, data, isLoading, isError, error, errorMessage, isSuccess } =
    useHttp<NotebookPutDto, INotebook>(notebookService.put, keys.notebook);

  const initialFields = {
    notebook: {
      value: "",
      error: "",
    },
  };

  const [performedHttp, setPerformedHttp] = useState(false);
  const [fields, setFields, animateFields, onChange] =
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

  useEffect(() => {
    setFields({
      notebook: {
        value: notebook.name,
        error: "",
      },
    });
  }, [notebook.name]);

  const serverValidationField = {
    notebook: {
      ...fields.notebook,
      error: errorMessage,
    },
  };

  function serverSideValidation(notebook: NotebookPutDto) {
    mutate(notebook);
    setPerformedHttp(true);
  }

  function serverSideValidationFailed() {
    return isError && performedHttp;
  }

  // Submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const notebookDto: NotebookDto = {
      name: fields.notebook.value,
    };

    const updatedNotebook = {
      id: notebook._id,
      data: notebookDto,
    };

    let clientSideValidationFailed = validate.notebook(fields.notebook.value);
    if (clientSideValidationFailed)
      return animateFields(preSubmitFields, clientValidationFields);

    serverSideValidation(updatedNotebook);
  }

  // When fails
  if (serverSideValidationFailed()) {
    animateFields(preSubmitFields, serverValidationField);
    setPerformedHttp(false);
  }

  // When succeeds
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Successfully updated to ${fields.notebook.value}.`);
      setFields({
        notebook: {
          value: "",
          error: "",
        },
      });
      onClosePopUp();
    }
  }, [isSuccess]);

  function closeFields() {
    setFields({
      notebook: {
        value: notebook.name,
        error: "",
      },
    });
    onClosePopUp();
  }

  return [fields, closeFields, onChange, handleSubmit, isLoading];
}

export default useUpdateNotebook;
