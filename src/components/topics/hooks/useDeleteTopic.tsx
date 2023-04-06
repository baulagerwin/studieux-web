import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useHttp from "../../../hooks/useHttp";
import ITopic from "../../../models/ITopic";
import keys from "../../../react-query/keys";
import topicService from "../../../services/topicService";
import queryClient from "../../../react-query/queryClient";
import { useSearchParams } from "react-router-dom";

function useDeleteTopic(
  topic: ITopic,
  onClosePopUp: () => void
): [() => void, (e: React.FormEvent) => void, boolean] {
  const { mutate, data, isLoading, isError, error, errorMessage, isSuccess } =
    useHttp(topicService.delete, keys.topics);

  const [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(topic._id);
  }

  useEffect(() => {
    if (isSuccess && !searchParams.get("filterBy")) {
      toast.success(`${topic.name} has been successfully deleted.`);
      queryClient.invalidateQueries(keys.qnas);
      close();
    }
    if (isSuccess && searchParams.get("filterBy") === topic.name) {
      searchParams.delete("filterBy");
      setSearchParams(searchParams);
      toast.success(`${topic.name} has been successfully deleted.`);
      queryClient.invalidateQueries(keys.qnas);
      close();
    }
  }, [isSuccess]);

  function close() {
    onClosePopUp();
  }

  return [close, handleSubmit, isLoading];
}

export default useDeleteTopic;
