import ITopic from "../model/ITopic";
import TopicFields from "../types/TopicFields";
import useCreateTopic from "./useCreateTopic";
import useDeleteTopic from "./useDeleteTopic";
import useUpdateTopic from "./useUpdateTopic";

export interface ITopicForm {
  add: {
    fields: TopicFields;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    close: () => void;
  };
  update: {
    fields: TopicFields;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    close: () => void;
  };
  delete: {
    value: string;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    close: () => void;
  };
}

function useTopicForm(
  notebookId: string,
  topic: ITopic,
  handleClosePopUp: () => void
): ITopicForm {
  const [
    createTopicFields,
    closeCreateTopicFields,
    onCreateTopicFieldsChange,
    onCreateTopicFieldsSubmit,
    onCreateTopicFieldsLoading,
  ] = useCreateTopic(notebookId, handleClosePopUp);

  const [
    updateTopicFields,
    closeUpdateTopicFields,
    onUpdateTopicFieldsChange,
    onUpdateTopicFieldsSubmit,
    onUpdateTopicFieldsLoading,
  ] = useUpdateTopic(notebookId, topic, handleClosePopUp);

  const [closeDeleteTopicFields, onDeleteSubmit, onDeleteTopicFieldsLoading] =
    useDeleteTopic(topic, handleClosePopUp);

  const topicForm = {
    add: {
      fields: createTopicFields,
      onChange: onCreateTopicFieldsChange,
      onSubmit: onCreateTopicFieldsSubmit,
      isLoading: onCreateTopicFieldsLoading,
      close: closeCreateTopicFields,
    },
    update: {
      fields: updateTopicFields,
      onChange: onUpdateTopicFieldsChange,
      onSubmit: onUpdateTopicFieldsSubmit,
      isLoading: onUpdateTopicFieldsLoading,
      close: closeUpdateTopicFields,
    },
    delete: {
      value: topic.name,
      onSubmit: onDeleteSubmit,
      isLoading: onDeleteTopicFieldsLoading,
      close: closeDeleteTopicFields,
    },
  };

  return topicForm;
}

export default useTopicForm;
