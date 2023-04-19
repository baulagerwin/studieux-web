import { AxiosError } from "axios";
import { UseMutateFunction, useMutation } from "react-query";
import queryClient from "../react-query/queryClient";

interface Return<T, K> {
  mutate: UseMutateFunction<K, unknown, T, unknown>;
  data: K | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError;
  errorMessage: string;
  isSuccess: boolean;
}

function useHttp<T, K>(
  service: (value: T) => Promise<K>,
  keysToInvalidate: string[] = []
): Return<T, K> {
  const { mutate, data, isLoading, isError, error, isSuccess } = useMutation(
    (value: T) => service(value),
    {
      onSuccess: () => {
        for (let keyToInvalidate of keysToInvalidate)
          queryClient.invalidateQueries(keyToInvalidate);
      },
    }
  );

  let ex = error as AxiosError;

  return {
    mutate,
    data,
    isLoading,
    isError,
    error: ex,
    errorMessage: ex?.response?.data as string,
    isSuccess,
  };
}

export default useHttp;
