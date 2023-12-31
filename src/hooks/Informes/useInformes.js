import { getInformesListConfirm } from "api/controllers/informes";
import { getInformesListNotConfirm } from "api/controllers/informes";
import { getListInforme } from "api/controllers/informes";
import MainContext from "context/mainContext/MainContext";
import { useContext } from "react";
import { useCallback, useMemo, useState } from "react";
import { getInformesCompletados } from "api/controllers/informes";
import { getInformesNoCompletados } from "api/controllers/informes";

export function useInformes() {

 const {informes, setInformes,
    filteredInforme, setfilteredInformelistp,setInformeslistp }= useContext(MainContext)
  
  const [informesCompletados, setInformesCompletados] = useState([]);
  const [informesNoCompletados, setInformesNoCompletados] = useState([]);
 
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);


  const getInformes = useCallback(async () => {
    try {
      setloading(true);
      seterror(null);
      const informeList = await getListInforme();
      setfilteredInformelistp(informeList)
      setInformes(informeList);  
      setInformeslistp(informeList)
     
      
    //  const completados = informeList.filter((item) => item.completado === true);
     // setInformesCompletados(completados);
    //  const Nocompletados = informeList.filter((item) => item.completado === false);
     // setInformesNoCompletados(Nocompletados);
   
     // console.log(facturasList);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }, []);

  const getInformesConfirm = useCallback(async () => {
    try {
      const ListConfirm = await getInformesCompletados();
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
      const ListConfirm = await getInformesNoCompletados();
      
      setInformesNoCompletados(ListConfirm)
    } catch (error) {
      //seterror(error.message);
    } finally {
      // setloading(false);
    }
  }, []);
  //console.log(informesCompletados);

 

  return {informes,getInformes,informesCompletados,informesNoCompletados,filteredInforme,loading,error,setInformes,getInformesNotConfirm,getInformesConfirm};
}