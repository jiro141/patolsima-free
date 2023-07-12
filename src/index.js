import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthProvider from "context/authContext/AuthProvider";
import ProtectedRoute from "ProtectedRoute/ProtectedRoute";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import { MainContextProvider } from "context/mainContext/MainContext";

function App() {
 return (
    <AuthProvider>
      <MainContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/auth" component={AuthLayout} />
            <ProtectedRoute path="/admin" component={AdminLayout} />
            <Redirect exact from="/" to="/auth/signin" />
          </Switch>
        </BrowserRouter>
      </MainContextProvider>
    </AuthProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
