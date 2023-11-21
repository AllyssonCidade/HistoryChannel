import React from "react";
import { useAuth } from "../componentes/AuthContext";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isValid } = useAuth();

  return (
    <Route
      {...rest}
      element={isValid ? <Element /> : <Navigate to="/login"/>}
    />
  );
};


export default PrivateRoute;
