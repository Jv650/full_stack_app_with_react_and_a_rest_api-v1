import UserContext from "../context/UserContext";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const SignOut = () => {
  const { actions } = useContext(UserContext);

  useEffect(() => actions.signOut());

  return <Navigate to="/home" replace />;
};

export default SignOut;
