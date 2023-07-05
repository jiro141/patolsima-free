import { getPacientesListByCi } from "api/controllers/pacientes";
import { useCallback, useMemo, useRef, useState } from "react";

export function usePacientsListCi({ searchci }) {
  const [pacientsByCi, setpacientsByCi] = useState([]);
  const [loadingpacientsByCi, setLoadingpacientsByCi] = useState(false);
  const [errorpacientsByCi, setErrorpacientsByCi] = useState(false);

  const previousSearch = useRef(searchci);

  const getPacientsByCi = useCallback(async ({ searchci }) => {
    if (searchci === previousSearch.current) return;
    try {
      setLoadingpacientsByCi(true);
      setErrorpacientsByCi(null);
      previousSearch.current = searchci;
      const newMovies = await getPacientesListByCi({ searchci });
      setpacientsByCi(newMovies);
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
  };
}