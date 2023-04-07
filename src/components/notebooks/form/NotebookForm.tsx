import { useEffect } from "react";
import Submit from "../../common/button/Submit";
import FormHeader from "../../common/formHeader/FormHeader";
import Form from "../../common/form/Form";
import Input from "../../common/input/Input";
import PopUp from "../../common/popup/PopUp";
import Confirmation from "../../common/confirmation/Confirmation";
import popUpFormKeys from "../popups/popUpKeys";
import NotebookFields from "../types/NotebookFields";

interface Props {
  type: string;
  value?: string;
  fields?: NotebookFields;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onCloseNotebook: () => void;
}

function NotebookForm({
  type,
  value = "",
  fields = { notebook: { value: "", error: "" } },
  onChange = () => {},
  onSubmit,
  isLoading,
  onCloseNotebook,
}: Props) {
  return (
    <PopUp onClose={onCloseNotebook}>
      {type === popUpFormKeys.addNotebook && (
        <FormHeader label="Create notebook" onClose={onCloseNotebook} />
      )}
      {type === popUpFormKeys.updateNotebook && (
        <FormHeader label="Edit notebook" onClose={onCloseNotebook} />
      )}
      {type === popUpFormKeys.deleteNotebook && (
        <FormHeader label="Delete confirmation" onClose={onCloseNotebook} />
      )}

      <hr />

      {type === popUpFormKeys.addNotebook && (
        <Form onSubmit={onSubmit}>
          <Input
            label="Name"
            placeholder="eg. Math, Science, English, etc."
            autoFocus={true}
            name="notebook"
            field={fields.notebook}
            onChange={onChange}
          />
          <Submit text="Submit" isLoading={isLoading} />
        </Form>
      )}
      {type === popUpFormKeys.updateNotebook && (
        <Form onSubmit={onSubmit}>
          <Input
            label="Name"
            placeholder="eg. Math, Science, English, etc."
            autoFocus={true}
            name="notebook"
            field={fields.notebook}
            onChange={onChange}
          />
          <Submit text="Update" isLoading={isLoading} />
        </Form>
      )}
      {type === popUpFormKeys.deleteNotebook && (
        <Confirmation
          value={value}
          onSubmit={onSubmit}
          onClose={onCloseNotebook}
          isLoading={isLoading}
        />
      )}
    </PopUp>
  );
}

export default NotebookForm;
