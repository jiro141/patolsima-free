import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthProvider from "context/authContext/AuthProvider";
import ProtectedRoute from "ProtectedRoute/ProtectedRoute";
import { handleTokenRefresh } from "api/controllers/token";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

function App() {
  React.useEffect(() => {
    handleTokenRefresh();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={AuthLayout} />
          <ProtectedRoute path="/admin" component={AdminLayout} />
          <Redirect exact from="/" to="/auth/signin" />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));