import { getFacturasList } from "api/controllers/facturas";
import { useCallback, useMemo, useState } from "react";

export function useFacturas() {
  const [facturas, setFacturas] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);


  const getFacturas = useCallback(async () => {
    try {
      setloading(true);
      seterror(null);
      const facturasList = await getFacturasList();
      setFacturas(facturasList);     
      console.log(facturasList);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }, []);
 

  return {facturas,getFacturas,loading,error };
}