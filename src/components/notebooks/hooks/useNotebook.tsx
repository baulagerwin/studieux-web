import { useQuery } from "react-query";
import INotebook from "../model/INotebook";
import IQNA from "../../../models/IQNA";
import ITopic from "../../../models/ITopic";
import keys from "../../../react-query/keys";
import notebookService from "../../../services/notebookService";
import useQNA from "../../qnas/hooks/useQNA";
import { IQNAForm } from "../../qnas/hooks/useQNAForm";
import useTopic from "../../topics/hooks/useTopic";
import { ITopicForm } from "../../topics/hooks/useTopicForm";
import useActivePopUp from "./useActivePopUp";
import useNotebookForm, { INotebookForm } from "./useNotebookForm";

function useNotebook(notebookId: string): [
  string,
  (value: string) => void,
  { data: INotebook; isLoading: boolean },
  INotebookForm,
  {
    topics: ITopic[];
    isLoading: boolean;
    initializer: (topic: ITopic) => void;
  },
  ITopicForm,
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
  const [activePopUp, onActivePopUp] = useActivePopUp();

  function handleClosePopUp() {
    onActivePopUp("");
  }

  const { data = { _id: notebookId, name: "" }, isLoading } = useQuery(
    [keys.notebook, notebookId],
    () => notebookService.getNotebook(notebookId)
  );
  const notebook = {
    data,
    isLoading,
  };

  const notebookForm = useNotebookForm(data, handleClosePopUp);
  const [topic, topicForm] = useTopic(notebookId, handleClosePopUp);
  const [qna, qnaForm] = useQNA(notebookId, topic.topics, handleClosePopUp);

  return [
    activePopUp,
    onActivePopUp,
    notebook,
    notebookForm,
    topic,
    topicForm,
    qna,
    qnaForm,
  ];
}

export default useNotebook;
