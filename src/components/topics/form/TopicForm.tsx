import { useEffect } from "react";
import Submit from "../../common/button/Submit";
import FormHeader from "../../common/formHeader/FormHeader";
import Form from "../../common/form/Form";
import Input from "../../common/input/Input";
import PopUp from "../../common/popup/PopUp";
import popUpFormKeys from "../../notebooks/popups/popUpKeys";
import Confirmation from "../../common/confirmation/Confirmation";
import TopicFields from "../types/TopicFields";

interface Props {
  type: string;
  value?: string;
  fields?: TopicFields;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCloseTopic: () => void;
  isLoading: boolean;
}

function TopicForm({
  type,
  value = "",
  fields = { topic: { value: "", error: "" } },
  onChange = () => {},
  onSubmit,
  isLoading,
  onCloseTopic,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <PopUp onClose={onCloseTopic}>
      {type === popUpFormKeys.addTopic && (
        <FormHeader label="Create topic" onClose={onCloseTopic} />
      )}
      {type === popUpFormKeys.editTopic && (
        <FormHeader label="Edit topic" onClose={onCloseTopic} />
      )}
      {type === popUpFormKeys.deleteTopic && (
        <FormHeader label="Delete confirmation" onClose={onCloseTopic} />
      )}

      <hr />

      {type === popUpFormKeys.addTopic && (
        <Form onSubmit={onSubmit}>
          <Input
            label="Name"
            placeholder="eg. Fractions, Digestive System, Noun, etc."
            autoFocus={true}
            name="topic"
            field={fields.topic}
            onChange={onChange}
          />
          <Submit text="Submit" isLoading={isLoading} />
        </Form>
      )}
      {type === popUpFormKeys.editTopic && (
        <Form onSubmit={onSubmit}>
          <Input
            label="Name"
            placeholder="eg. Fractions, Digestive System, Noun, etc."
            autoFocus={true}
            name="topic"
            field={fields.topic}
            onChange={onChange}
          />
          <Submit text="Update" isLoading={isLoading} />
        </Form>
      )}
      {type === popUpFormKeys.deleteTopic && (
        <Confirmation
          value={value}
          onSubmit={onSubmit}
          onClose={onCloseTopic}
          isLoading={isLoading}
        />
      )}
    </PopUp>
  );
}

export default TopicForm;
