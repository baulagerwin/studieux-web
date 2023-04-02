import INotebook from "../model/INotebook";
import NotebookFields from "../types/NotebookFields";
import useDeleteNotebook from "./useDeleteNotebook";
import useUpdateNotebook from "./useUpdateNotebook";

export interface INotebookForm {
  update: {
    fields: NotebookFields;
    close: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
  };
  delete: {
    value: string;
    close: () => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
  };
}

function useNotebookForm(
  notebook: INotebook,
  handleClosePopUp: () => void
): INotebookForm {
  const [
    updateNotebookFields,
    closeUpdateFields,
    onUpdateNotebookFieldsChange,
    onUpdateNotebookFieldsSubmit,
    isUpdateNotebookFieldsLoading,
  ] = useUpdateNotebook(notebook, handleClosePopUp);

  const [
    closeDeleteFields,
    onDeleteNotebookSubmit,
    isDeleteNotebookFieldsLoading,
  ] = useDeleteNotebook(notebook, handleClosePopUp);

  const notebookForm = {
    update: {
      fields: updateNotebookFields,
      close: closeUpdateFields,
      onChange: onUpdateNotebookFieldsChange,
      onSubmit: onUpdateNotebookFieldsSubmit,
      isLoading: isUpdateNotebookFieldsLoading
    },
    delete: {
      value: notebook.name,
      close: closeDeleteFields,
      onSubmit: onDeleteNotebookSubmit,
      isLoading: isDeleteNotebookFieldsLoading
    },
  };

  return notebookForm;
}

export default useNotebookForm;
