import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import IQNA from "../model/IQNA";
import ITopic from "../../topics/model/ITopic";
import keys from "../../../react-query/keys";
import qnaService from "../../../services/qnaService";
import useQNAForm, { IQNAForm } from "./useQNAForm";
import { useSearchParams } from "react-router-dom";
import queryClient from "../../../react-query/queryClient";

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
    isFetching: boolean;
    initializer: (qna: IQNA) => void;
  },
  IQNAForm
] {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 5;

  const queryString =
    "notebookId=" + notebookId + "&" + searchParams.toString();

  const {
    data: qnas,
    isLoading: qnasLoading,
    isFetching: qnasFetching,
  } = useQuery([keys.qnas, queryString], () => qnaService.get(queryString), {
    keepPreviousData: true,
  });

  // useEffect(() => {
  //   const nextPage = page + 1;
  //   const doesContainPage = searchParams.toString().indexOf(`page=${page}`) > 1;

  //   let nextQueryString: string = doesContainPage
  //     ? "notebookId=" +
  //       notebookId +
  //       "&" +
  //       searchParams.toString().replace(`page=${page}`, `page=${nextPage}`)
  //     : "notebookId=" +
  //       notebookId +
  //       "&" +
  //       searchParams.toString().replace(``, `pageSize=${pageSize}&page=${2}`);

  //   queryClient.prefetchQuery([keys.qnas, nextQueryString], () =>
  //     qnaService.get(nextQueryString)
  //   );
  // }, [page]);

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
    isFetching: qnasFetching,
    initializer,
  };

  const qnaForm = useQNAForm(qnaData, topics, onClosePopUp);

  return [qna, qnaForm];
}

export default useQNA;
