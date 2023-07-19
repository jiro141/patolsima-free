import { studiesDetail } from "api/controllers/estudios";
import { getFacturasDetail } from "api/controllers/facturas";
import { getFacturasList } from "api/controllers/facturas";
import { getCambio } from "api/controllers/tazaDia";
import MainContext from "context/mainContext/MainContext";
import { useContext } from "react";
import { useCallback, useMemo, useState } from "react";

export function useFacturaDetail({studyId}) {
  const [facturasDetail, setFacturasDetail] = useState(null);
  const [studyDetail, setStudyDetail] = useState(null);
  const [itemOrden, setItemOrden] = useState();
  const [loadingDetailFact, setloadingDetailFact] = useState(false);
  const [errorC, seterrorC] = useState(false);
  const [loadingStudy, setloadingStudy] = useState(false);
  const [error, seterror] = useState(false);

  const getFacturasDetails = useCallback(async () => {
    try {
      const facturasDetail = await getFacturasDetail(studyId);
      setFacturasDetail(facturasDetail);
      setItemOrden(facturasDetail.cliente.id);
    } catch (error) {
      console.log(error);
    } finally {
        setloadingDetailFact(false);
    }
  }, []);

  const getStudyDetail = useCallback(async () => {
    try {
      const study = await studiesDetail(24);
      setStudyDetail(study);
    } catch (error) {
      console.log(error);
    } finally {
    setloadingStudy(false);
    }
  }, []);

  return {
    getFacturasDetails,
    facturasDetail,
    studyDetail,
    itemOrden,
    getStudyDetail,
    loadingDetailFact,
    loadingStudy,
    itemOrden
  };
}
