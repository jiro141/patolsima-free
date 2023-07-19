import { getStudiesListPriorityMEDIA } from "api/controllers/estudios";
import { getStudiesDetail } from "api/controllers/estudios";
import { getStudiesListPriorityBAJA } from "api/controllers/estudios";
import { getStudiesListPriorityALTA } from "api/controllers/estudios";
import { getFacturasList } from "api/controllers/facturas";
import { getListInforme } from "api/controllers/informes";
import { getCambio } from "api/controllers/tazaDia";
import MainContext from "context/mainContext/MainContext";
import { useContext } from "react";
import { useCallback, useMemo, useState } from "react";

export function useMuestraDetail({studyId}) {

 const {}= useContext(MainContext)
  
  const [detailMuestra, setdetailMuestra] = useState([]);

 
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);




  const getMuestraDetail = useCallback(async () => {
    try {
        setloading(true);
      seterror(null);
      const detailmuestra = await getStudiesDetail(studyId);
      setdetailMuestra(detailmuestra)
 
    } catch (error) {
      seterror(error.message);
    } finally {
        setloading(false);
    }
  }, []);






 

  return {detailMuestra,getMuestraDetail,loading,error};
}