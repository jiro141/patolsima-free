import { useCallback, useMemo, useRef, useState } from "react";
import { getClientByCi } from "api/controllers/facturas";

export function useClientCiByorder({ searchci }) {
  const [pacientsByCi, setpacientsByCi] = useState([]);
  const [loadingpacientsByCi, setLoadingpacientsByCi] = useState(false);
  const [errorpacientsByCi, setErrorpacientsByCi] = useState(false);
  const [pacienteID, setPacienteID] = useState('');

  const previousSearch = useRef(searchci);

  const getPacientsByCi = useCallback(async ({ searchci }) => {
    if (searchci === previousSearch.current) return;
    try {
      setLoadingpacientsByCi(true);
      setErrorpacientsByCi(null);
      previousSearch.current = searchci;
      const newPacients = await getClientByCi({ searchci });
      // console.log(newPacients, 'tercero');
      setpacientsByCi(newPacients);
    } catch (e) {
      setErrorpacientsByCi(e.message);
    } finally {
      setLoadingpacientsByCi(false);
    }
  }, []);
  //  console.log(pacientsByCi);


  return {
    pacientsByCi,
    getPacientsByCi,
    errorpacientsByCi,
    loadingpacientsByCi,
    setpacientsByCi
  };
}