import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute = () => {
  let { currentUser } = useContext(AuthContext);

  return currentUser.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
