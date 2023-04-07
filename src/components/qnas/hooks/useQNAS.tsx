import { useState } from "react";
import ITopic from "../../../models/ITopic";
import useCreateQNA from "./useCreateQNA";
import useGetQNAS from "./useGetQNAS";
import IQNA from "../../../models/IQNA";
import useUpdateQNA from "./useUpdateQNA";
import useDeleteQNA from "./useDeleteQNA";

function useQNAS(
  notebookId: string,
  queryString: string,
  topics: ITopic[],
  onActivePopUp: (value: string) => void
) {
  const initialQNA = {
    _id: "",
    topic: {
      _id: "",
      name: "",
    },
    question: "",
    answer: "",
  };

  const createQNA = useCreateQNA(topics, onActivePopUp);
  const items = useGetQNAS(notebookId, queryString);
  const [qna, setQNA] = useState<IQNA>(initialQNA);
  const updateQNA = useUpdateQNA(qna, topics, onActivePopUp);
  const deleteQNA = useDeleteQNA(qna, onActivePopUp);

  return { createQNA, items, initializeQNA: setQNA, updateQNA, deleteQNA };
}

export default useQNAS;
