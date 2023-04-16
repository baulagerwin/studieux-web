import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TopicDto from "../../../dtos/TopicDto";
import useFields from "../../../hooks/useFields";
import useHttp from "../../../hooks/useHttp";
import ITopic from "../../../models/ITopic";
import keys from "../../../react-query/keys";
import topicService from "../../../services/topicService";
import validate from "../../../utils/validate";
import TopicFields from "../types/TopicFields";
import queryClient from "../../../react-query/queryClient";

export interface CreateTopic {
  fields: TopicFields;
  closeFields: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

function useCreateTopic(
  notebookId: string,
  onActivePopUp: (value: string) => void
): CreateTopic {
  const { mutate, isError, isLoading, errorMessage, isSuccess } = useHttp<
    TopicDto,
    ITopic
  >(topicService.post, keys.topics);

  const initialTopic = {
    topic: {
      value: "",
      error: "",
    },
  };

  const [performedHttp, setPerformedHttp] = useState(false);
  const [fields, setFields, animateFields, handleOnChange] =
    useFields<TopicFields>(initialTopic);

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

  function serverSideValidation(topic: TopicDto) {
    mutate(topic);
    setPerformedHttp(true);
  }

  function serverSideValidationFailed() {
    return isError && performedHttp;
  }

  // Submit
  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    const topic = {
      notebookId,
      name: fields.topic.value,
    };

    let clientSideValidationFailed = validate.topic(fields.topic.value);
    if (clientSideValidationFailed)
      return animateFields(preSubmitFields, clientValidationField);

    serverSideValidation(topic);
  }

  // When fails
  if (serverSideValidationFailed()) {
    animateFields(preSubmitFields, serverValidationField);
    setPerformedHttp(false);
  }

  // When succeeds
  useEffect(() => {
    if (isSuccess) {
      toast.success(`${fields.topic.value} has been successfully added.`);
      queryClient.invalidateQueries(keys.reviews);
      closeFields();
    }
  }, [isSuccess]);

  function closeFields() {
    setFields({
      topic: {
        value: "",
        error: "",
      },
    });
    onActivePopUp("");
  }

  return { fields, closeFields, handleOnChange, handleOnSubmit, isLoading };
}

export default useCreateTopic;
