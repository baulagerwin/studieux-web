import { useState } from "react";
import { useQuery } from "react-query";
import ITopic from "../model/ITopic";
import keys from "../../../react-query/keys";
import topicService from "../../../services/topicService";
import useTopicForm, { ITopicForm } from "./useTopicForm";

function useTopic(
  notebookId: string,
  onClosePopUp: () => void
): [
  {
    topics: ITopic[];
    isLoading: boolean;
    initializer: (topic: ITopic) => void;
  },
  ITopicForm
] {
  const [topicData, setTopicData] = useState<ITopic>({
    _id: "",
    name: "",
  });

  const { data: topics, isLoading: topicsLoading } = useQuery(keys.topics, () =>
    topicService.get("notebookId=" + notebookId)
  );

  function initializer(topic: ITopic) {
    setTopicData(topic);
  }

  const topic = {
    topics: topics || [],
    isLoading: topicsLoading,
    initializer,
  };

  const topicForm = useTopicForm(notebookId, topicData, onClosePopUp);

  return [topic, topicForm];
}

export default useTopic;
