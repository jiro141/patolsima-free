import { getListInforme } from "api/controllers/informes";
import MainContext from "context/mainContext/MainContext";
import { useContext } from "react";
import { useCallback, useMemo, useState } from "react";

export function useInformes() {

 const {informes, setInformes,
    filteredInforme, setfilteredInforme }= useContext(MainContext)
  
  const [informesCompletados, setInformesCompletados] = useState([]);
  const [informesNoCompletados, setInformesNoCompletados] = useState([]);
 
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);


  const getInformes = useCallback(async () => {
    try {
      setloading(true);
      seterror(null);
      const informeList = await getListInforme();
      setInformes(informeList);  
      setfilteredInforme(informeList)
      const completados = informeList.filter((item) => item.completado === true);
      setInformesCompletados(completados);
      const Nocompletados = informeList.filter((item) => item.completado === false);
      setInformesNoCompletados(Nocompletados);
   
     // console.log(facturasList);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }, []);
  console.log(informesCompletados);
 /* const getCambios = useCallback(async () => {
    try {
      setloadingCambio(true);
      seterrorC(null);
      const Cambio = await getCambio();
      setCambioDelDia(Cambio)
    } catch (error) {
      seterrorC(error.message);
    } finally {
      setloadingCambio(false);
    }
  }, []);*/
 

  return {informes,getInformes,informesCompletados,informesNoCompletados,filteredInforme,loading,error,setInformes};
}