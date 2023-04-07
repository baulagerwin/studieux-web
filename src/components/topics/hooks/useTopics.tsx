import { useState } from "react";
import useCreateTopic from "./useCreateTopic";
import useUpdateTopic from "./useUpdateTopic";
import useDeleteTopic from "./useDeleteTopic";
import ITopic from "../../../models/ITopic";
import useGetTopics from "./useGetTopics";

function useTopics(notebookId: string, onActivePopUp: (value: string) => void) {
  const initialTopic = { _id: "", name: "" };

  const createTopic = useCreateTopic(notebookId, onActivePopUp);
  const items = useGetTopics(notebookId);
  const [topic, setTopic] = useState<ITopic>(initialTopic);
  const updateTopic = useUpdateTopic(notebookId, topic, onActivePopUp);
  const deleteTopic = useDeleteTopic(topic, onActivePopUp);

  return {
    createTopic,
    items,
    initializeTopic: setTopic,
    updateTopic,
    deleteTopic,
  };
}

export default useTopics;
