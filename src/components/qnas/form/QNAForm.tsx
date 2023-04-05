import { useEffect, useState } from "react";
import Submit from "../../common/button/Submit";
import Confirmation from "../../common/confirmation/Confirmation";
import DropDownMenu from "../../common/dropDownMenu/DropDownMenu";
import Form from "../../common/form/Form";
import FormHeader from "../../common/formHeader/FormHeader";
import Input from "../../common/input/Input";
import PopUp from "../../common/popup/PopUp";
import TextArea from "../../common/textarea/TextArea";
import popUpFormKeys from "../../notebooks/popups/popUpKeys";
import QNAFields from "../types/QNAFields";

interface Props<T extends { _id: string; name: string }> {
  type: string;
  value?: string;
  xBy?: string;
  onXBy?: (value: string) => void;
  isXOpen?: boolean;
  onXOpen?: (value: boolean) => void;
  items?: T[];
  limitLength?: number;
  fields?: QNAFields;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onCloseQNA: () => void;
}

function QNAForm<T extends { _id: string; name: string }>({
  type,
  value = "",
  xBy = "",
  onXBy = (value) => {},
  isXOpen = false,
  onXOpen = (value) => {},
  items = [],
  limitLength = 5,
  fields = {
    question: { value: "", error: "" },
    answer: { value: "", error: "" },
  },
  onChange = (e) => {},
  onKeyDown = (e) => {},
  onSubmit,
  isLoading,
  onCloseQNA,
}: Props<T>) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const tabletWidth = 768;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (windowWidth <= tabletWidth) return;
    onKeyDown(e);
  }

  return (
    <PopUp onClose={onCloseQNA}>
      {type === popUpFormKeys.addQNA && (
        <FormHeader label="Create Q & A" onClose={onCloseQNA} />
      )}
      {type === popUpFormKeys.editQNA && (
        <FormHeader label="Edit Q & A" onClose={onCloseQNA} />
      )}
      {type === popUpFormKeys.deleteQNA && (
        <FormHeader label="Delete confirmation" onClose={onCloseQNA} />
      )}

      <hr />

      {type === popUpFormKeys.addQNA && (
        <Form onSubmit={onSubmit}>
          <DropDownMenu
            label={""}
            xBy={xBy}
            onXBy={onXBy}
            isXOpen={isXOpen}
            onXOpen={onXOpen}
            items={items}
            limitLength={limitLength}
          />
          <Input
            label="Question"
            placeholder="eg. What is the closest planet to the sun?"
            autoFocus={true}
            name="question"
            field={fields.question}
            onChange={onChange}
          />
          <TextArea
            label="Answer"
            placeholder="eg. Mars"
            autoFocus={false}
            name="answer"
            field={fields.answer}
            onChange={onChange}
            onKeyDown={handleOnKeyDown}
          />
          <Submit text="Submit" isLoading={isLoading} />
        </Form>
      )}
      {type === popUpFormKeys.editQNA && (
        <Form onSubmit={onSubmit}>
          <DropDownMenu
            label={""}
            xBy={xBy}
            onXBy={onXBy}
            isXOpen={isXOpen}
            onXOpen={onXOpen}
            items={items}
            limitLength={limitLength}
          />
          <Input
            label="Question"
            placeholder="eg. What is the closest planet to the sun?"
            autoFocus={true}
            name="question"
            field={fields.question}
            onChange={onChange}
          />
          <TextArea
            label="Answer"
            placeholder="eg. Mars"
            autoFocus={false}
            name="answer"
            field={fields.answer}
            onChange={onChange}
            onKeyDown={handleOnKeyDown}
          />
          <Submit text="Update" isLoading={isLoading} />
        </Form>
      )}
      {type === popUpFormKeys.deleteQNA && (
        <Confirmation
          value={value}
          onSubmit={onSubmit}
          onClose={onCloseQNA}
          isLoading={isLoading}
        />
      )}
    </PopUp>
  );
}

export default QNAForm;
