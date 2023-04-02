import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";

function Authenticated() {
  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn) return <Navigate to="/signin" />;

  return <Outlet />;
}

export default Authenticated;
