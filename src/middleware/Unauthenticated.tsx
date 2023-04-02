import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";

function Unauthenticated() {
  const isLoggedIn = authService.isLoggedIn();

  if (isLoggedIn) return <Navigate to="/notebooks" />;

  return <Outlet />;
}

export default Unauthenticated;
