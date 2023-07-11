import { getFacturasList } from "api/controllers/facturas";
import { getCambio } from "api/controllers/tazaDia";
import MainContext from "context/mainContext/MainContext";
import { useContext } from "react";
import { useCallback, useMemo, useState } from "react";

export function useFacturas() {
 // const [facturas, setFacturas] = useState([]);
 const {facturas, setFacturas, setfilteredFact }= useContext(MainContext)
  
  const [facturasConfirmadas, setFacturasConfirmadas] = useState([]);
  const [facturasNoConfirmadas, setFacturasNoConfirmadas] = useState([]);
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
      const confirmadas = facturasList.filter((item) => item.confirmada === true);
      setFacturasConfirmadas(confirmadas)
      const Noconfirmadas = facturasList.filter((item) => item.confirmada === false);
      setFacturasNoConfirmadas(Noconfirmadas)
   
     // console.log(facturasList);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }, []);

  const getCambios = useCallback(async () => {
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
  }, []);
 

  return {facturas,getFacturas,facturasConfirmadas,facturasNoConfirmadas,loading,error,getCambios,cambioDelDia,loadingCambio,errorC };
}