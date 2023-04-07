import FormHeader from "../../common/formHeader/FormHeader";
import PopUp from "../../common/popup/PopUp";
import QNAForm from "../../qnas/form/QNAForm";
import { CreateQNA } from "../../qnas/hooks/useCreateQNA";
import { DeleteQNA } from "../../qnas/hooks/useDeleteQNA";
import { UpdateQNA } from "../../qnas/hooks/useUpdateQNA";
import TopicForm from "../../topics/form/TopicForm";
import { CreateTopic } from "../../topics/hooks/useCreateTopic";
import { DeleteTopic } from "../../topics/hooks/useDeleteTopic";
import { UpdateTopic } from "../../topics/hooks/useUpdateTopic";
import NotebookForm from "../form/NotebookForm";
import { DeleteNotebook } from "../hooks/useDeleteNotebook";
import { UpdateNotebook } from "../hooks/useUpdateNotebook";
import popUpKeys from "./popUpKeys";

interface Props {
  activePopUp: string;
  updateNotebook: UpdateNotebook;
  deleteNotebook: DeleteNotebook;
  createTopic: CreateTopic;
  updateTopic: UpdateTopic;
  deleteTopic: DeleteTopic;
  createQNA: CreateQNA;
  updateQNA: UpdateQNA;
  deleteQNA: DeleteQNA;
}

function NotebookPopUps({
  activePopUp,
  updateNotebook,
  deleteNotebook,
  createTopic,
  updateTopic,
  deleteTopic,
  createQNA,
  updateQNA,
  deleteQNA,
}: Props) {
  return (
    <>
      {activePopUp === popUpKeys.updateNotebook && (
        <NotebookForm
          type={popUpKeys.updateNotebook}
          fields={updateNotebook.fields}
          onChange={updateNotebook.handleOnChange}
          onSubmit={updateNotebook.handleOnSubmit}
          onCloseNotebook={updateNotebook.closeFields}
          isLoading={updateNotebook.isLoading}
        />
      )}
      {activePopUp === popUpKeys.deleteNotebook && (
        <NotebookForm
          type={popUpKeys.deleteNotebook}
          value={deleteNotebook.notebook.name}
          onSubmit={deleteNotebook.handleOnSubmit}
          onCloseNotebook={deleteNotebook.closeFields}
          isLoading={deleteNotebook.isLoading}
        />
      )}
      {activePopUp === popUpKeys.addTopic && (
        <TopicForm
          type={popUpKeys.addTopic}
          fields={createTopic.fields}
          onChange={createTopic.handleOnChange}
          onSubmit={createTopic.handleOnSubmit}
          isLoading={createTopic.isLoading}
          onCloseTopic={createTopic.closeFields}
        />
      )}
      {activePopUp === popUpKeys.updateTopic && (
        <TopicForm
          type={popUpKeys.updateTopic}
          fields={updateTopic.fields}
          onChange={updateTopic.handleOnChange}
          onSubmit={updateTopic.handleOnSubmit}
          isLoading={updateTopic.isLoading}
          onCloseTopic={updateTopic.closeFields}
        />
      )}
      {activePopUp === popUpKeys.deleteTopic && (
        <TopicForm
          type={popUpKeys.deleteTopic}
          value={deleteTopic.topic.name}
          onSubmit={deleteTopic.handleOnSubmit}
          isLoading={deleteTopic.isLoading}
          onCloseTopic={deleteTopic.closeFields}
        />
      )}
      {activePopUp === popUpKeys.addQNA && Boolean(createQNA.topics.length) && (
        <QNAForm
          type={popUpKeys.addQNA}
          xBy={createQNA.dropDown.topic}
          onXBy={createQNA.dropDown.onTopic}
          isXOpen={createQNA.dropDown.isTopicOpen}
          onXOpen={createQNA.dropDown.onTopicOpen}
          items={createQNA.topics}
          limitLength={4}
          fields={createQNA.fields}
          onChange={createQNA.handleOnChange}
          onKeyDown={createQNA.handleOnKeyDown}
          onSubmit={createQNA.handleOnSubmit}
          isLoading={createQNA.isLoading}
          onCloseQNA={createQNA.closeFields}
        />
      )}
      {activePopUp === popUpKeys.addQNA &&
        Boolean(!createQNA.topics.length) && (
          <PopUp onClose={createQNA.closeFields}>
            <FormHeader label="Empty topic" onClose={createQNA.closeFields} />
            <hr />
            <p className="u__toast--container u__text--center">
              In order to create a question and answer, you have to create a
              topic first!
            </p>
            <button
              type="button"
              className="btn btn--full"
              onClick={createQNA.closeFields}
            >
              Got it
            </button>
          </PopUp>
        )}
      {activePopUp === popUpKeys.updateQNA && (
        <QNAForm
          type={popUpKeys.updateQNA}
          xBy={updateQNA.dropDown.topic}
          onXBy={updateQNA.dropDown.onTopic}
          isXOpen={updateQNA.dropDown.isTopicOpen}
          onXOpen={updateQNA.dropDown.onTopicOpen}
          items={updateQNA.topics}
          limitLength={4}
          fields={updateQNA.fields}
          onChange={updateQNA.handleOnChange}
          onKeyDown={updateQNA.handleOnKeyDown}
          onSubmit={updateQNA.handleOnSubmit}
          isLoading={updateQNA.isLoading}
          onCloseQNA={updateQNA.closeFields}
        />
      )}
      {activePopUp === popUpKeys.deleteQNA && (
        <QNAForm
          type={popUpKeys.deleteQNA}
          value={deleteQNA.qna.question}
          onSubmit={deleteQNA.handleOnSubmit}
          isLoading={deleteQNA.isLoading}
          onCloseQNA={deleteQNA.closeFields}
        />
      )}
    </>
  );
}

export default NotebookPopUps;
