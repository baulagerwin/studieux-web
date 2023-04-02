import { useState } from "react";

function useFields<T>(
  initialFields: T
): [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  (preSubmitFields: T, validatedFields: T) => void,
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
] {
  const [fields, setFields] = useState<T>(initialFields);

  function animateFields(
    preSubmitFields: T,
    validatedFields: T,
    ms: number = 200
  ) {
    setFields(preSubmitFields);

    setTimeout(() => {
      setFields(validatedFields);
    }, ms);
  }

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFields({
      ...fields,
      [e.target.name]: {
        value: e.target.value,
        error: "",
      },
    });
  }

  return [fields, setFields, animateFields, handleOnChange];
}

export default useFields;
