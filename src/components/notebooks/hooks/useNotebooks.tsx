import useCreateNotebook from "./useCreateNotebook";
import useDeleteNotebook from "./useDeleteNotebook";
import useGetNotebook from "./useGetNotebook";
import useGetNotebooks from "./useGetNotebooks";
import useUpdateNotebook from "./useUpdateNotebook";

function useNotebooks(
  notebookId: string,
  queryString: string,
  onActivePopUp: (value: string) => void
) {
  const createNotebook = useCreateNotebook(onActivePopUp);
  const items = useGetNotebooks(queryString);
  const item = useGetNotebook(notebookId);
  const updateNotebook = useUpdateNotebook(item.data, onActivePopUp);
  const deleteNotebook = useDeleteNotebook(item.data, onActivePopUp);

  return {
    createNotebook,
    items,
    item,
    updateNotebook,
    deleteNotebook,
  };
}

export default useNotebooks;
