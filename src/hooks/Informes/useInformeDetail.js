import { getInformeDetail } from "api/controllers/informes";
import MainContext from "context/mainContext/MainContext";
import { useContext } from "react";
import { useCallback, useMemo, useState } from "react";

export function useInformeDetail({studyId}) {

 //const {}= useContext(MainContext)
  
  const [informeDetail, setInformeDetail] = useState([]);

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);


  const getInformeDetail = useCallback(async () => {
    try {
      setloading(true);
      seterror(null);
      const informeList = await getInformeDetail(studyId);    
      setInformeDetail(informeList)
   
     // console.log(facturasList);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }, []);


 

  return {informeDetail,getInformeDetail,loading,error};
}