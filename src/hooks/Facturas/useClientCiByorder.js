import { getPacientesDetail } from "api/controllers/pacientes";
import { getPacientesListByCi } from "api/controllers/pacientes";
import { useCallback, useMemo, useRef, useState } from "react";

export function useClientCiByorder({ searchci }) {
  const [pacientsByCi, setpacientsByCi] = useState([]);
  const [loadingpacientsByCi, setLoadingpacientsByCi] = useState(false);
  const [errorpacientsByCi, setErrorpacientsByCi] = useState(false);
  const [pacienteID,setPacienteID]=useState('');

  const previousSearch = useRef(searchci);

  const getPacientsByCi = useCallback(async ({ searchci }) => {
    if (searchci === previousSearch.current) return;
    try {
      setLoadingpacientsByCi(true);
      setErrorpacientsByCi(null);
      previousSearch.current = searchci;
      const newPacients = await getPacientesListByCi({ searchci });
      setpacientsByCi(newPacients);
    } catch (e) {
      setErrorpacientsByCi(e.message);
    } finally {
      setLoadingpacientsByCi(false);
    }
  }, []);
 


  return {
    pacientsByCi,
    getPacientsByCi,
    errorpacientsByCi,
    loadingpacientsByCi,
    setpacientsByCi
  };
}