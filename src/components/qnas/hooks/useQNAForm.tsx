import React from "react";
import ITopic from "../../../models/ITopic";
import IQNA from "../../../models/IQNA";
import QNADropDown from "../types/QNADropDown";
import QNAFields from "../types/QNAFields";
import useCreateQNA from "./useCreateQNA";
import useDeleteQNA from "./useDeleteQNA";
import useUpdateQNA from "./useUpdateQNA";

export interface IQNAForm {
  add: {
    topics: ITopic[];
    dropDown: QNADropDown;
    fields: QNAFields;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    close: () => void;
  };
  update: {
    topics: ITopic[];
    dropDown: QNADropDown;
    fields: QNAFields;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
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

function useQNAForm(
  qna: IQNA,
  topics: ITopic[],
  onClosePopUp: () => void
): IQNAForm {
  const [
    createQNADropDownMenu,
    createQNAFields,
    createQNAClose,
    createQNAChange,
    createQNAKeyDown,
    createQNASubmit,
    createQNALoading,
  ] = useCreateQNA(topics, onClosePopUp);

  const [
    updateQNADropDownMenu,
    updateQNAFields,
    updateQNAClose,
    updateQNAChange,
    updateQNAKeyDown,
    updateQNASubmit,
    updateQNALoading,
  ] = useUpdateQNA(qna, topics, onClosePopUp);

  const [deleteQNAClose, deleteQNASubmit, deleteQNALoading] = useDeleteQNA(
    qna._id,
    onClosePopUp
  );

  const qnaForm: IQNAForm = {
    add: {
      topics,
      dropDown: createQNADropDownMenu,
      fields: createQNAFields,
      onChange: createQNAChange,
      onKeyDown: createQNAKeyDown,
      onSubmit: createQNASubmit,
      isLoading: createQNALoading,
      close: createQNAClose,
    },
    update: {
      topics,
      dropDown: updateQNADropDownMenu,
      fields: updateQNAFields,
      onChange: updateQNAChange,
      onKeyDown: updateQNAKeyDown,
      onSubmit: updateQNASubmit,
      isLoading: updateQNALoading,
      close: updateQNAClose,
    },
    delete: {
      value: qna.question,
      onSubmit: deleteQNASubmit,
      isLoading: deleteQNALoading,
      close: deleteQNAClose,
    },
  };

  return qnaForm;
}

export default useQNAForm;
