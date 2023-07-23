import { studiesDetail } from "api/controllers/estudios";
import { getFacturasDetail } from "api/controllers/facturas";
import { getFacturasList } from "api/controllers/facturas";
import { getCambio } from "api/controllers/tazaDia";
import MainContext from "context/mainContext/MainContext";
import { useContext } from "react";
import { useCallback, useMemo, useState } from "react";

export function useFacturaDetail({ studyId }) {
  const [facturasDetail, setFacturasDetail] = useState(null);
  const [studyDetail, setStudyDetail] = useState(null);
  const [itemOrden, setItemOrden] = useState();
  const [loadingDetailFact, setloadingDetailFact] = useState(false);
  const [errorC, seterrorC] = useState(false);
  const [loadingStudy, setloadingStudy] = useState(false);
  const [error, seterror] = useState(false);

  const getFacturasDetails = useCallback(async () => {
    try {
      setloadingDetailFact(true);
      seterror(false);
      const facturasDetail = await getFacturasDetail(studyId);
      setFacturasDetail(facturasDetail);

      // Actualizar archived a true si por_pagar_usd es igual a 0
      if (facturasDetail.por_pagar_usd === 0) {
        setFacturasDetail((prevState) => ({
          ...prevState,
          archived: true,
        }));
      }

      const itemsOrden = facturasDetail.items_orden;
      console.log(itemsOrden);
      if (itemsOrden && itemsOrden.length > 0) {
        setItemOrden(itemsOrden[0].estudio);
      }
    } catch (error) {
      console.log(error);
      seterror(true);
    } finally {
      setloadingDetailFact(false);
    }
  }, [studyId]);

  const getStudyDetail = useCallback(async () => {
    try {
      setloadingStudy(true);
      seterror(false);
      const study = await studiesDetail(24);
      setStudyDetail(study);
    } catch (error) {
      console.log(error);
      seterror(true);
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
    itemOrden,
    setFacturasDetail,
  };
}
