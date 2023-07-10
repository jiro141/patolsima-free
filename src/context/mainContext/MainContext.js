import React, { createContext, useState } from 'react';

const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  const [oneState, setOneState] = useState('post');
  const [twoState, setTwoState] = useState('post');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [facturas, setFacturas] = useState([]);
  const [filteredFact, setfilteredFact] = useState([]);
  const [hiddenFactssort, sethiddenFactssort] = useState(true);

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