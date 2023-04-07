import { useQuery } from "react-query";
import topicService from "../../../services/topicService";
import keys from "../../../react-query/keys";
import ITopic from "../../../models/ITopic";

function useGetTopics(notebookId: string): {
  data: ITopic[];
  isLoading: boolean;
  isFetching: boolean;
} {
  const fallback: ITopic[] = [];
  const {
    data = fallback,
    isLoading,
    isFetching,
  } = useQuery([keys.topics, notebookId], () =>
    topicService.get("notebookId=" + notebookId)
  );

  return { data, isLoading, isFetching };
}

export default useGetTopics;
