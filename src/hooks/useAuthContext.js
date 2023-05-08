import AuthContext from "context/authContext/AuthContext";
import { useContext } from "react";
export function useAuthContext() {
    return useContext(AuthContext);
  }