import React, { createContext, useState } from 'react';

const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  const [oneState, setOneState] = useState('post');
  const [twoState, setTwoState] = useState('post');


  return (
    <MainContext.Provider
      value={{
        activeTab,
        setActiveTab,
        oneState,
        setOneState,
        twoState, setTwoState
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;