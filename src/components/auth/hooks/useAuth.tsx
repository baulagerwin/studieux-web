import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthDto from "../dto/AuthDto";
import useHttp from "../../../hooks/useHttp";
import authService from "../../../services/authService";
import AuthFields from "../types/AuthFields";

function useAuth(): [
  AuthFields,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  boolean,
  (e: React.FormEvent) => void
] {
  const navigate = useNavigate();
  const { mutate, data, isLoading, isError, error, errorMessage, isSuccess } =
    useHttp<AuthDto, string>(authService.signIn);

  const [performedHttp, setPerformedHttp] = useState(false);
  const [fields, setFields] = useState<AuthFields>({
    username: "",
    password: "",
    error: "",
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
      error: "",
    });
  }

  function serverSideValidationFailed() {
    return (
      isError &&
      performedHttp &&
      error.response &&
      error.response.status === 400
    );
  }

  // Submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = {
      username: fields.username,
      password: fields.password,
    };

    mutate(user);
    setPerformedHttp(true);
  }

  // When fails
  if (serverSideValidationFailed()) {
    setFields({
      username: fields.username,
      password: fields.password,
      error: errorMessage.replace(/["]/gi, ""),
    });
    setPerformedHttp(false);
  }

  // When succeeds
  useEffect(() => {
    if (isSuccess) {
      authService.loginWithJwt(data as string);
      navigate("/");
    }
  }, [navigate, isSuccess]);

  return [fields, handleOnChange, isLoading, handleSubmit];
}

export default useAuth;
