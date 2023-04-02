import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();

    navigate("/");
  }, []);

  return null;
}

export default Logout;
