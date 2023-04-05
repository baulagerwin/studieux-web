import FormHeader from "../../common/formHeader/FormHeader";
import PopUp from "../../common/popup/PopUp";
import QNAForm from "../../qnas/form/QNAForm";
import { IQNAForm } from "../../qnas/hooks/useQNAForm";
import TopicForm from "../../topics/form/TopicForm";
import { ITopicForm } from "../../topics/hooks/useTopicForm";
import NotebookForm from "../form/NotebookForm";
import { INotebookForm } from "../hooks/useNotebookForm";
import popUpKeys from "./popUpKeys";

interface Props {
  activePopUp: string;
  notebookForm: INotebookForm;
  topicForm: ITopicForm;
  qnaForm: IQNAForm;
}

function NotebookPopUps({
  activePopUp,
  notebookForm,
  topicForm,
  qnaForm,
}: Props) {
  return (
    <>
      {activePopUp === popUpKeys.editNotebook && (
        <NotebookForm
          type={popUpKeys.editNotebook}
          fields={notebookForm.update.fields}
          onChange={notebookForm.update.onChange}
          onSubmit={notebookForm.update.onSubmit}
          onCloseNotebook={notebookForm.update.close}
          isLoading={notebookForm.update.isLoading}
        />
      )}
      {activePopUp === popUpKeys.deleteNotebook && (
        <NotebookForm
          type={popUpKeys.deleteNotebook}
          value={notebookForm.delete.value}
          onSubmit={notebookForm.delete.onSubmit}
          onCloseNotebook={notebookForm.delete.close}
          isLoading={notebookForm.delete.isLoading}
        />
      )}
      {activePopUp === popUpKeys.addTopic && (
        <TopicForm
          type={popUpKeys.addTopic}
          fields={topicForm.add.fields}
          onChange={topicForm.add.onChange}
          onSubmit={topicForm.add.onSubmit}
          isLoading={topicForm.add.isLoading}
          onCloseTopic={topicForm.add.close}
        />
      )}
      {activePopUp === popUpKeys.editTopic && (
        <TopicForm
          type={popUpKeys.editTopic}
          fields={topicForm.update.fields}
          onChange={topicForm.update.onChange}
          onSubmit={topicForm.update.onSubmit}
          isLoading={topicForm.update.isLoading}
          onCloseTopic={topicForm.update.close}
        />
      )}
      {activePopUp === popUpKeys.deleteTopic && (
        <TopicForm
          type={popUpKeys.deleteTopic}
          value={topicForm.delete.value}
          onSubmit={topicForm.delete.onSubmit}
          isLoading={topicForm.delete.isLoading}
          onCloseTopic={topicForm.delete.close}
        />
      )}
      {activePopUp === popUpKeys.addQNA &&
        Boolean(qnaForm.add.topics.length) && (
          <QNAForm
            type={popUpKeys.addQNA}
            xBy={qnaForm.add.dropDown.topic}
            onXBy={qnaForm.add.dropDown.onTopic}
            isXOpen={qnaForm.add.dropDown.isTopicOpen}
            onXOpen={qnaForm.add.dropDown.onTopicOpen}
            items={qnaForm.add.topics}
            limitLength={4}
            fields={qnaForm.add.fields}
            onChange={qnaForm.add.onChange}
            onKeyDown={qnaForm.add.onKeyDown}
            onSubmit={qnaForm.add.onSubmit}
            onMobileSubmit={qnaForm.add.onMobileSubmit}
            isLoading={qnaForm.add.isLoading}
            onCloseQNA={qnaForm.add.close}
          />
        )}
      {activePopUp === popUpKeys.addQNA &&
        Boolean(!qnaForm.add.topics.length) && (
          <PopUp onClose={qnaForm.add.close}>
            <FormHeader label="Empty topic" onClose={qnaForm.add.close} />
            <hr />
            <p className="u__toast--container u__text--center">
              In order to create a question and answer, you have to create a
              topic first!
            </p>
            <button
              type="button"
              className="btn btn--full"
              onClick={qnaForm.add.close}
            >
              Got it
            </button>
          </PopUp>
        )}
      {activePopUp === popUpKeys.editQNA && (
        <QNAForm
          type={popUpKeys.editQNA}
          xBy={qnaForm.update.dropDown.topic}
          onXBy={qnaForm.update.dropDown.onTopic}
          isXOpen={qnaForm.update.dropDown.isTopicOpen}
          onXOpen={qnaForm.update.dropDown.onTopicOpen}
          items={qnaForm.update.topics}
          limitLength={4}
          fields={qnaForm.update.fields}
          onChange={qnaForm.update.onChange}
          onKeyDown={qnaForm.update.onKeyDown}
          onSubmit={qnaForm.update.onSubmit}
          isLoading={qnaForm.update.isLoading}
          onCloseQNA={qnaForm.update.close}
        />
      )}
      {activePopUp === popUpKeys.deleteQNA && (
        <QNAForm
          type={popUpKeys.deleteQNA}
          value={qnaForm.delete.value}
          onSubmit={qnaForm.delete.onSubmit}
          isLoading={qnaForm.delete.isLoading}
          onCloseQNA={qnaForm.delete.close}
        />
      )}
    </>
  );
}

export default NotebookPopUps;
