import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
    // Log this error in sentry.io if u have a subscription
    console.log("Logging the error", error);
    toast.error("An unexpected error occured. Try again later.");
  }

  return Promise.reject(error);
});

export function setJwtInHeader(jwt: string | null): void {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default axios;
