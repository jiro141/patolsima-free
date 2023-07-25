import { getFacturasListNoConfirm } from "api/controllers/facturas";
import { getFacturasListConfirm } from "api/controllers/facturas";
import { getFacturasList } from "api/controllers/facturas";
import { getCambio } from "api/controllers/tazaDia";
import MainContext from "context/mainContext/MainContext";
import { useContext } from "react";
import { useCallback, useMemo, useState } from "react";

export function useFacturas() {
  // const [facturas, setFacturas] = useState([]);
  const { facturas, setFacturas, setfilteredFact, archived } = useContext(MainContext)

  const [facturasConfirmadas, setFacturasConfirmadas] = useState([]);
  const [facturasNoConfirmadas, setFacturasNoConfirmadas] = useState([]);
  const [facturasNoConfirmadasFirstId, setFacturasNoConfirmadasFirstId] = useState([]);
  const [cambioDelDia, setCambioDelDia] = useState('');
  const [loadingCambio, setloadingCambio] = useState(false);
  const [errorC, seterrorC] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);


  const getFacturas = useCallback(async () => {
    try {
      setloading(true);
      seterror(null);
      const facturasList = await getFacturasList();
      setFacturas(facturasList);
      setfilteredFact(facturasList)
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }, []);
  const getFacturasConfirm = useCallback(async () => {
    try {
      const facturasListConfirm = await getFacturasListConfirm();
      console.log(facturasListConfirm);
      if (facturasListConfirm) {
        const archivedFacts = facturasListConfirm.filter((item) => item.pagada === false);
        setFacturasConfirmadas(archivedFacts);
      } 
      // console.log(facturasList);
    } catch (error) {
      //seterror(error.message);
    } finally {
      // setloading(false);
    }
  }, []);
  const getFacturasNotConfirm = useCallback(async () => {
    try {
      const facturasListNotConfirm = await getFacturasListNoConfirm();
      if (facturasListNotConfirm) {
        const archivedFacts = facturasListNotConfirm.filter((item) => item.archived === false);
        // console.log();
        setFacturasNoConfirmadas(archivedFacts);
       
        //setFacturasNoConfirmadasFirstId(primerId)
      }
      // } else {
      //   setFacturasNoConfirmadas(facturasListNotConfirm);
      // }
    } catch (error) {
      //seterror(error.message);
    } finally {
      // setloading(false);
    }
  }, []);

  const getCambios = useCallback(async () => {
    try {
      setloadingCambio(true);
      seterrorC(null);
      const Cambio = await getCambio();
      console.log(Cambio);
      setCambioDelDia(Cambio);
    } catch (error) {
      seterrorC(error.message);
    } finally {
      setloadingCambio(false);
    }
  }, []);


  return { facturas, getFacturas, facturasConfirmadas, facturasNoConfirmadas, loading, error, getCambios, cambioDelDia, loadingCambio, errorC, getFacturasConfirm, getFacturasNotConfirm, setFacturasConfirmadas, setFacturasNoConfirmadas,facturasNoConfirmadasFirstId };
}