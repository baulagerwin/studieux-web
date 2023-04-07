import { useEffect } from "react";
import { toast } from "react-toastify";
import useHttp from "../../../hooks/useHttp";
import ITopic from "../../../models/ITopic";
import keys from "../../../react-query/keys";
import topicService from "../../../services/topicService";
import queryClient from "../../../react-query/queryClient";
import { useSearchParams } from "react-router-dom";

export interface DeleteTopic {
  topic: ITopic;
  closeFields: () => void;
  handleOnSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

function useDeleteTopic(
  topic: ITopic,
  onActivePopUp: (value: string) => void
): DeleteTopic {
  const { mutate, data, isLoading, isError, error, errorMessage, isSuccess } =
    useHttp(topicService.delete, keys.topics);

  const [searchParams, setSearchParams] = useSearchParams();

  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(topic._id);
  }

  useEffect(() => {
    if (isSuccess && !searchParams.get("filterBy")) {
      toast.success(`${topic.name} has been successfully deleted.`);
      queryClient.invalidateQueries(keys.qnas);
      closeFields();
    }
    if (isSuccess && searchParams.get("filterBy") === topic.name) {
      searchParams.delete("filterBy");
      setSearchParams(searchParams);
      toast.success(`${topic.name} has been successfully deleted.`);
      queryClient.invalidateQueries(keys.qnas);
      closeFields();
    }
  }, [isSuccess]);

  function closeFields() {
    onActivePopUp("");
  }

  return { topic, closeFields, handleOnSubmit, isLoading };
}

export default useDeleteTopic;
