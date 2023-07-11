import { handleTokenRefresh } from 'api/controllers/token';
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  const [oneState, setOneState] = useState('post');
  const [twoState, setTwoState] = useState('post');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [facturas, setFacturas] = useState([]);
  const [filteredFact, setfilteredFact] = useState([]);
  const [hiddenFactssort, sethiddenFactssort] = useState(true);

  //const history = useHistory();
  
  useEffect( async() => {
    handleTokenRefresh();
  // await history.push("../Auth/SignIn");
  
   }, []);

  return (
    <MainContext.Provider
      value={{
        activeTab,
        setActiveTab,
        oneState,
        setOneState,
        twoState, setTwoState,
        loginSuccess, setLoginSuccess,
        facturas, setFacturas,
        filteredFact, setfilteredFact,
        hiddenFactssort, sethiddenFactssort
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;