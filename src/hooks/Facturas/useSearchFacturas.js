import { getFacturasList } from "api/controllers/facturas";
import { useCallback, useMemo, useState } from "react";

export function useSearchFacturas() { 

  const [searchFacturas, setSearchFacturas] = useState([]);
  const [staticFacturas, setStaticFacturas] = useState([]);
  const [loadingSF, setloading] = useState(false);
  const [error, seterror] = useState(false);


  const getSearchFacturas = useCallback(async () => {
    try {
      setloading(true);
      seterror(null);
      const facturasList = await getFacturasList();
      setSearchFacturas(facturasList)
      setStaticFacturas(facturasList)
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }, []);

  
 

  return {getSearchFacturas,loadingSF,searchFacturas,staticFacturas,error,setSearchFacturas };
}