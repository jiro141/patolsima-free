import { getInformesListConfirm } from "api/controllers/informes";
import { getInformesListNotConfirm } from "api/controllers/informes";
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
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }, []);

  const getInformesConfirm = useCallback(async () => {
    try {
      const ListConfirm = await getInformesListConfirm();
      console.log(ListConfirm);
      setInformesCompletados(ListConfirm)
    } catch (error) {
      //seterror(error.message);
    } finally {
      // setloading(false);
    }
  }, []);

  const getInformesNotConfirm = useCallback(async () => {
    try {
      const ListConfirm = await getInformesListNotConfirm();
      
      setInformesNoCompletados(ListConfirm)
    } catch (error) {
      //seterror(error.message);
    } finally {
      // setloading(false);
    }
  }, []);
  console.log(informesCompletados);

 

  return {informes,getInformes,informesCompletados,informesNoCompletados,filteredInforme,loading,error,setInformes,getInformesNotConfirm,getInformesConfirm};
}