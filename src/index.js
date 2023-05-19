import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthProvider from "context/authContext/AuthProvider";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/auth`} component={AuthLayout} />
        <Redirect from={`/`} to="/auth/signin" />
      </Switch>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
