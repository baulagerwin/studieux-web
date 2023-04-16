import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import QNADto from "../../../dtos/QNADto";
import useFields from "../../../hooks/useFields";
import useHttp from "../../../hooks/useHttp";
import IQNA from "../../../models/IQNA";
import ITopic from "../../../models/ITopic";
import keys from "../../../react-query/keys";
import qnaService from "../../../services/qnaService";
import validate from "../../../utils/validate";
import QNADropDown from "../types/QNADropDown";
import QNAFields from "../types/QNAFields";
import queryClient from "../../../react-query/queryClient";

export interface CreateQNA {
  topics: ITopic[];
  dropDown: QNADropDown;
  fields: QNAFields;
  closeFields: () => void;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleOnKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleOnSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

function useCreateQNA(
  topics: ITopic[],
  onActivePopUp: (value: string) => void
): CreateQNA {
  const { mutate, isError, isLoading, errorMessage, isSuccess } = useHttp<
    QNADto,
    IQNA
  >(qnaService.post, keys.qnas);

  const initialTopic = "----";
  const initialQNA: QNAFields = {
    question: {
      value: "",
      error: "",
    },
    answer: {
      value: "",
      error: "",
    },
  };
  const [topic, setTopic] = useState(initialTopic);
  const [isTopicOpen, setTopicOpen] = useState(false);
  const [performedHttp, setPerformedHttp] = useState(false);
  const [fields, setFields, animateFields, handleOnChange] =
    useFields<QNAFields>(initialQNA);

  const dropDown: QNADropDown = {
    topic,
    onTopic: setTopic,
    isTopicOpen,
    onTopicOpen: setTopicOpen,
  };

  const preSubmitFields: QNAFields = {
    question: {
      ...fields.question,
      error: "",
    },
    answer: {
      ...fields.answer,
      error: "",
    },
  };

  const clientValidationFields: QNAFields = {
    question: {
      ...fields.question,
      error: validate.question(fields.question.value),
    },
    answer: {
      ...fields.answer,
      error: validate.answer(fields.answer.value),
    },
  };

  const serverValidationFields: QNAFields = {
    question: {
      ...fields.question,
      error: errorMessage,
    },
    answer: {
      ...fields.answer,
      error: "",
    },
  };

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.blur();
      handleOnSubmit(e);
    }
  }

  function serverSideValidation(qna: QNADto) {
    mutate(qna);
    setPerformedHttp(true);
  }

  function serverSideValidationFailed() {
    return isError && performedHttp;
  }

  function findTopicId(name: string) {
    const topic = topics.find((topic) => topic.name === name);

    return topic?._id;
  }

  // Submit
  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (topic === initialTopic) return;

    const qna: QNADto = {
      topicId: findTopicId(topic) || "",
      question: fields.question.value,
      answer: fields.answer.value,
    };

    let clientSideValidationFailed =
      validate.question(fields.question.value) ||
      validate.answer(fields.answer.value);
    if (clientSideValidationFailed)
      return animateFields(preSubmitFields, clientValidationFields);

    serverSideValidation(qna);
  }

  // When fails
  if (serverSideValidationFailed()) {
    animateFields(preSubmitFields, serverValidationFields);
    setPerformedHttp(false);
  }

  // When succeeds
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Question and answer has been successfully added.`);
      setTopicOpen(false);
      setFields({
        question: {
          value: "",
          error: "",
        },
        answer: {
          value: "",
          error: "",
        },
      });
      queryClient.invalidateQueries(keys.reviews);
    }
  }, [isSuccess]);

  function closeFields() {
    setTopicOpen(false);
    setTopic(initialTopic);
    setFields({
      question: {
        value: "",
        error: "",
      },
      answer: {
        value: "",
        error: "",
      },
    });
    onActivePopUp("");
  }

  return {
    topics,
    dropDown,
    fields,
    closeFields,
    handleOnChange,
    handleOnKeyDown,
    handleOnSubmit,
    isLoading,
  };
}

export default useCreateQNA;
