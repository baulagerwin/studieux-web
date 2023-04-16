import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TopicDto from "../../../dtos/TopicDto";
import useFields from "../../../hooks/useFields";
import useHttp from "../../../hooks/useHttp";
import ITopic from "../../../models/ITopic";
import keys from "../../../react-query/keys";
import topicService, { TopicPutDto } from "../../../services/topicService";
import validate from "../../../utils/validate";
import TopicFields from "../types/TopicFields";
import { useSearchParams } from "react-router-dom";
import queryClient from "../../../react-query/queryClient";

export interface UpdateTopic {
  fields: TopicFields;
  closeFields: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

function useUpdateTopic(
  notebookId: string,
  topic: ITopic,
  onActivePopUp: (value: string) => void
): UpdateTopic {
  const { mutate, data, isLoading, isError, error, errorMessage, isSuccess } =
    useHttp<TopicPutDto, ITopic>(topicService.put, keys.topics);

  const initialFields = {
    topic: {
      value: "",
      error: "",
    },
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [performedHttp, setPerformedHttp] = useState(false);
  const [fields, setFields, animateFields, handleOnChange] =
    useFields<TopicFields>(initialFields);

  useEffect(() => {
    setFields({
      topic: {
        value: topic.name,
        error: "",
      },
    });
  }, [topic.name]);

  const preSubmitFields = {
    topic: {
      ...fields.topic,
      error: "",
    },
  };

  const clientValidationField = {
    topic: {
      ...fields.topic,
      error: validate.topic(fields.topic.value),
    },
  };

  const serverValidationField = {
    topic: {
      ...fields.topic,
      error: errorMessage,
    },
  };

  function serverSideValidation(topic: TopicPutDto) {
    mutate(topic);
    setPerformedHttp(true);
  }

  function serverSideValidationFailed() {
    return isError && performedHttp;
  }

  // Submit
  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    const topicDto: TopicDto = {
      notebookId: notebookId,
      name: fields.topic.value,
    };

    const updatedTopic = {
      id: topic._id,
      data: topicDto,
    };

    let clientSideValidationFailed = validate.topic(fields.topic.value);
    if (clientSideValidationFailed)
      return animateFields(preSubmitFields, clientValidationField);

    serverSideValidation(updatedTopic);
  }

  // When fails
  if (serverSideValidationFailed()) {
    animateFields(preSubmitFields, serverValidationField);
    setPerformedHttp(false);
  }

  // When succeeds
  useEffect(() => {
    if (isSuccess && !searchParams.get("filterBy")) {
      toast.success(`Successfully updated to ${fields.topic.value}.`);
      queryClient.invalidateQueries(keys.qnas);
      setFields({
        topic: {
          value: "",
          error: "",
        },
      });
      onActivePopUp("");
    }
    if (isSuccess && searchParams.get("filterBy") === topic.name) {
      searchParams.set("filterBy", fields.topic.value);
      setSearchParams(searchParams);
      toast.success(`Successfully updated to ${fields.topic.value}.`);
      queryClient.invalidateQueries(keys.qnas);
      queryClient.invalidateQueries(keys.reviews);
      setFields({
        topic: {
          value: "",
          error: "",
        },
      });
      onActivePopUp("");
    }
  }, [isSuccess]);

  function closeFields() {
    setFields({
      topic: {
        value: topic.name,
        error: "",
      },
    });
    onActivePopUp("");
  }

  return { fields, closeFields, handleOnChange, handleOnSubmit, isLoading };
}

export default useUpdateTopic;
