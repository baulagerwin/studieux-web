import { useState } from "react";
import { useQuery } from "react-query";
import IQNA from "../model/IQNA";
import ITopic from "../../topics/model/ITopic";
import keys from "../../../react-query/keys";
import qnaService from "../../../services/qnaService";
import useQNAForm, { IQNAForm } from "./useQNAForm";
import { useSearchParams } from "react-router-dom";

function useQNA(
  notebookId: string,
  topics: ITopic[],
  onClosePopUp: () => void
): [
  {
    qnas: {
      count: number;
      results: IQNA[];
    };
    isLoading: boolean;
    initializer: (qna: IQNA) => void;
  },
  IQNAForm
] {
  const [searchParams] = useSearchParams();
  const queryString =
    "notebookId=" + notebookId + "&" + searchParams.toString();

  const { data: qnas, isLoading: qnasLoading } = useQuery(
    [keys.qnas, queryString],
    () => qnaService.get(queryString),
    {
      keepPreviousData: true,
    }
  );

  const [qnaData, setQNAData] = useState<IQNA>({
    _id: "",
    topic: {
      _id: "",
      name: "",
    },
    question: "",
    answer: "",
  });

  function initializer(qna: IQNA) {
    setQNAData(qna);
  }

  const qna = {
    qnas,
    isLoading: qnasLoading,
    initializer,
  };

  const qnaForm = useQNAForm(qnaData, topics, onClosePopUp);

  return [qna, qnaForm];
}

export default useQNA;
