import { getStudiesListPriorityMEDIA } from "api/controllers/estudios";
import { getStudiesList } from "api/controllers/estudios";
import { getStudiesListPriorityBAJA } from "api/controllers/estudios";
import { getStudiesListPriorityALTA } from "api/controllers/estudios";
import { getFacturasList } from "api/controllers/facturas";
import { getInformesList } from "api/controllers/informes";
import { getListInforme } from "api/controllers/informes";
import { getCambio } from "api/controllers/tazaDia";
import MainContext from "context/mainContext/MainContext";
import { useContext } from "react";
import { useCallback, useMemo, useState } from "react";

export function useMuestrasPatologo() {

 const {muestrasPatologo, setMuestrasPatologo,
  filteredInformeP, setfilteredInforme,informesp, setInformesp,setfilteredInformeP }= useContext(MainContext)
  
  const [muestraALTA, setmuestraALTA] = useState([]);
  const [muestraMEDIA, setmuestraMEDIA] = useState([]);
  const [muestraBAJA, setmuestraBAJA] = useState([]);
 
  const [loadingA, setloadingA] = useState(false);
  const [errorA, seterrorA] = useState(false);

  const [loadingM, setloadingM] = useState(false);
  const [errorM, seterrorM] = useState(false);

  const [loadingB, setloadingB] = useState(false);
  const [errorB, seterrorB] = useState(false);

  const getInformes = useCallback(async () => {
    try {
     
      const InformesList = await getStudiesList();
      console.log(typeof InformesList);
      setfilteredInformeP(InformesList)
      setInformesp(InformesList);
     // setfilteredInforme(InformesList)
    } catch (error) {
      
    } finally {
      
    }
  }, []);

  const getMuestrasPatologoAlta = useCallback(async () => {
    try {
        setloadingA(true);
      seterrorA(null);
      const muestralistAlta = await getStudiesListPriorityALTA();
      setmuestraALTA(muestralistAlta)
      //setfilteredInformeP(muestralistAlta)
    } catch (error) {
      seterrorA(error.message);
    } finally {
        setloadingA(false);
    }
  }, []);
  const getMuestrasPatologoMedia = useCallback(async () => {
    try {
      setloadingM(true);
      seterrorM(null);
      const muestralistMedia = await getStudiesListPriorityMEDIA();
      setmuestraMEDIA(muestralistMedia)
 
    } catch (error) {
      seterrorM(error.message);
    } finally {
      setloadingM(false);
    }
  }, []);


  const getMuestrasPatologoBaja = useCallback(async () => {
    try {
      setloadingB(true);
      seterrorB(null);
      const muestralistBaja = await getStudiesListPriorityBAJA();
      setmuestraBAJA(muestralistBaja)
 
    } catch (error) {
      seterrorB(error.message);
    } finally {
      setloadingB(false);
    }
  }, []);


 

  return {muestraALTA,muestraMEDIA,muestraBAJA,getMuestrasPatologoAlta,getMuestrasPatologoMedia,getMuestrasPatologoBaja,loadingA,loadingM,loadingB,getInformes};
}