import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import QNADto from "../dto/QNADto";
import useFields from "../../../hooks/useFields";
import useHttp from "../../../hooks/useHttp";
import IQNA from "../model/IQNA";
import ITopic from "../../topics/model/ITopic";
import keys from "../../../react-query/keys";
import qnaService, { QNAPutDto } from "../../../services/qnaService";
import validate from "../../../utils/validate";
import QNADropDown from "../types/QNADropDown";
import QNAFields from "../types/QNAFields";

function useUpdateQNA(
  qna: IQNA,
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
    QNAPutDto,
    IQNA
  >(qnaService.put, keys.qnas);

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

  useEffect(() => {
    setTopic(qna.topic.name);
    setFields({
      question: {
        value: qna.question,
        error: "",
      },
      answer: {
        value: qna.answer,
        error: "",
      },
    });
  }, [qna.topic.name, qna.question, qna.answer]);

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

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.blur();
      handleSubmit(e);
    }
  }

  function serverSideValidation(qna: QNAPutDto) {
    mutate(qna);
    setPerformedHttp(true);
  }

  function serverSideValidationFailed() {
    return isError && performedHttp;
  }

  function findTopicIdByName(name: string) {
    const topic = topics.find((topic) => topic.name === name);

    return topic?._id;
  }

  // Submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (topic === initialTopic) return;

    const qnaDto: QNAPutDto = {
      id: qna._id,
      data: {
        topicId: findTopicIdByName(topic) || "",
        question: fields.question.value,
        answer: fields.answer.value,
      },
    };

    let clientSideValidationFailed =
      validate.question(fields.question.value) ||
      validate.answer(fields.answer.value);
    if (clientSideValidationFailed)
      return animateFields(preSubmitFields, clientValidationFields);

    serverSideValidation(qnaDto);
  }

  // When fails
  if (serverSideValidationFailed()) {
    setPerformedHttp(false);
  }

  // When succeeds
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Question and answer has been updated successfully.`);
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
      onClosePopUp();
    }
  }, [isSuccess]);

  function closeFields() {
    setTopicOpen(false);
    setTopic(qna.topic.name);
    setFields({
      question: {
        value: qna.question,
        error: "",
      },
      answer: {
        value: qna.answer,
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

export default useUpdateQNA;
