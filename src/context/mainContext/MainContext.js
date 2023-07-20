import Axios from 'api/authApi';
import { handleTokenRefresh } from 'api/controllers/token';
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//import { useNavigate} from "react-router-dom";


const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  const [oneState, setOneState] = useState('post');
  const [twoState, setTwoState] = useState('post');
  const [loginSuccess, setLoginSuccess] = useState(false);
  //--------------------------------------------------------
  const [facturas, setFacturas] = useState([]);
  const [filteredFact, setfilteredFact] = useState([]);
  const [hiddenFactssort, sethiddenFactssort] = useState(true);
   //--------------------------------------------------------
  const [informes, setInformes] = useState([]);
  const [filteredInforme, setfilteredInforme] = useState([]);
  const [hiddenInformessort, sethiddenInformessort] = useState(true);

 //--------------------------------------------------------
 const [muestrasPatologo, setMuestrasPatologo] = useState([]);
 const [filteredMuestrasPatologo, setfilteredMuestrasPatologo] = useState([]);
 const [hiddenmuestrasPatologosort, sethiddenmuestrasPatologosort] = useState(true);
 //--------------------------------------------------------

 //factura terceros
 const [factClientTerceros, setfactClientTerceros] = useState(null);

   useEffect(() => {
  
     const fetchRefreshToken= async () => {
       const refresh =  window.localStorage.getItem("refresh");
       try {
         const response = await Axios.post('/token/refresh/',{refresh}); 
         //console.log(response.data.access)
          window.localStorage.setItem('newAcessToken', response.data.access);     
       } catch (error) {
         console.log(error);
       }
     };
     fetchRefreshToken();
     const interval = setInterval(() => {
      
       fetchRefreshToken();
       window.localStorage.removeItem('access')
      window.localStorage.removeItem('refresh')
     },2 * 60 * 60 * 1000);
     
    
     return () => clearInterval(interval);
   
     
   }, [])
   

  return (
    <MainContext.Provider
      value={{
        activeTab,
        setActiveTab,
        oneState,
        setOneState,
        twoState,
        setTwoState,
        loginSuccess, setLoginSuccess,
        facturas, setFacturas,
        filteredFact, setfilteredFact,
        hiddenFactssort, sethiddenFactssort,
        informes, setInformes,
        filteredInforme, setfilteredInforme,
        hiddenInformessort, sethiddenInformessort,
        muestrasPatologo, setMuestrasPatologo,
        filteredMuestrasPatologo, setfilteredMuestrasPatologo,
        hiddenmuestrasPatologosort, sethiddenmuestrasPatologosort,
        factClientTerceros, setfactClientTerceros

      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;