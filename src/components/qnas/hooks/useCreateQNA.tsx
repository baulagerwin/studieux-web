import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import QNADto from "../dto/QNADto";
import useFields from "../../../hooks/useFields";
import useHttp from "../../../hooks/useHttp";
import IQNA from "../model/IQNA";
import ITopic from "../../topics/model/ITopic";
import keys from "../../../react-query/keys";
import qnaService from "../../../services/qnaService";
import validate from "../../../utils/validate";
import QNADropDown from "../types/QNADropDown";
import QNAFields from "../types/QNAFields";

function useCreateQNA(
  topics: ITopic[],
  onClosePopUp: () => void
): [
  QNADropDown,
  QNAFields,
  () => void,
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  (e: React.KeyboardEvent<HTMLTextAreaElement>) => void,
  (e: React.FormEvent) => void,
  boolean
] {
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
  const [fields, setFields, animateFields, onChange] =
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
      handleSubmit(e);
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
  function handleSubmit(e: React.FormEvent) {
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
    onClosePopUp();
  }

  return [
    dropDown,
    fields,
    closeFields,
    onChange,
    handleOnKeyDown,
    handleSubmit,
    isLoading,
  ];
}

export default useCreateQNA;
