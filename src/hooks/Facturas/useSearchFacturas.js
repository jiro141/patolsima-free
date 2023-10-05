import { getOrdenListBySearch } from "api/controllers/facturas";
import { useCallback, useState } from "react";

export function useSearchFacturas() {
  const [searchFacturas, setSearchFacturas] = useState([]);
  const [loadingSF, setLoadingSF] = useState(false);
  const [error, setError] = useState(null);

  const getSearchFacturas = useCallback(async (search) => {
    try {
      setLoadingSF(true);
      setError(null);
      // Llama a la función que obtiene la lista de facturas por búsqueda
      const facturasList = await getOrdenListBySearch(search);
      setSearchFacturas(facturasList);
      console.log(facturasList, 'facturas lisrt');
      // Actualiza el estado con la lista de facturas
      
      console.log(searchFacturas, 'hola');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingSF(false);
    }
  }, []);

  return {
    getSearchFacturas,
    loadingSF,
    searchFacturas,
    error,
    setSearchFacturas
  };
}
