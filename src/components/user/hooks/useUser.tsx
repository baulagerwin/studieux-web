import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDto from "../../../dtos/UserDto";
import useFields from "../../../hooks/useFields";
import useHttp from "../../../hooks/useHttp";
import authService from "../../../services/authService";
import userService from "../../../services/userService";
import validate from "../../../utils/validate";
import UserFields from "../types/UserFields";

function useSignUp(): [
  UserFields,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  boolean,
  (e: React.FormEvent) => void
] {
  const navigate = useNavigate();
  const { mutate, data, isLoading, isError, errorMessage, isSuccess } = useHttp<
    UserDto,
    string
  >(userService.signUp);

  const initialFields = {
    firstName: {
      value: "",
      error: "",
    },
    lastName: {
      value: "",
      error: "",
    },
    username: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  };

  const [performedHttp, setPerformedHttp] = useState(false);
  const [fields, setFields, animateFields, onChange] =
    useFields<UserFields>(initialFields);

  let preSubmitFields = {
    firstName: {
      value: fields.firstName.value,
      error: "",
    },
    lastName: {
      value: fields.lastName.value,
      error: "",
    },
    username: {
      value: fields.username.value,
      error: "",
    },
    email: {
      value: fields.email.value,
      error: "",
    },
    password: {
      value: fields.password.value,
      error: "",
    },
  };

  const clientValidationFields = {
    firstName: {
      value: fields.firstName.value,
      error: validate.firstName(fields.firstName.value),
    },
    lastName: {
      value: fields.lastName.value,
      error: validate.lastName(fields.lastName.value),
    },
    username: {
      value: fields.username.value,
      error: validate.username(fields.username.value),
    },
    email: {
      value: fields.email.value,
      error: validate.email(fields.email.value),
    },
    password: {
      value: fields.password.value,
      error: validate.password(fields.password.value),
    },
  };

  const serverValidationFields = {
    firstName: {
      value: fields.firstName.value,
      error: validate.firstName(fields.firstName.value),
    },
    lastName: {
      value: fields.lastName.value,
      error: validate.lastName(fields.lastName.value),
    },
    username: {
      value: fields.username.value,
      error: errorMessage,
    },
    email: {
      value: fields.email.value,
      error: validate.email(fields.email.value),
    },
    password: {
      value: fields.password.value,
      error: validate.password(fields.password.value),
    },
  };

  function clientSideValidation() {
    return (
      validate.firstName(fields.firstName.value) ||
      validate.lastName(fields.lastName.value) ||
      validate.username(fields.username.value) ||
      validate.email(fields.email.value) ||
      validate.password(fields.password.value)
    );
  }

  function serverSideValidation(user: UserDto) {
    mutate(user);
    setPerformedHttp(true);
  }

  function serverSideValidationFailed() {
    return isError && performedHttp;
  }

  // Submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = {
      firstName: fields.firstName.value,
      lastName: fields.lastName.value,
      username: fields.username.value,
      email: fields.email.value,
      password: fields.password.value,
    };

    let clientSideValidationFailed = clientSideValidation();
    if (clientSideValidationFailed)
      return animateFields(preSubmitFields, clientValidationFields);

    serverSideValidation(user);
  }

  // When fails
  if (serverSideValidationFailed()) {
    animateFields(preSubmitFields, serverValidationFields);
    setPerformedHttp(false);
  }

  // When succeeds
  useEffect(() => {
    if (isSuccess) {
      authService.loginWithJwt(data as string);
      navigate("/");
    }
  }, [navigate, isSuccess]);

  return [fields, onChange, isLoading, handleSubmit];
}

export default useSignUp;
