import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("access");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/auth/signin" />
      }
    />
  );
};

export default ProtectedRoute;
