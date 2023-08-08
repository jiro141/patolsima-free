import { getPacientesListBySearch } from "api/controllers/pacientes";
import { useCallback, useRef, useState } from "react";

export function usePacientsListBySearch({ search }) {
  const [pacientsBySearch, setpacientsBySearch] = useState([]);
  const [loadingpacientsBySearch, setLoadingpacientsBySearch] = useState(false);
  const [errorpacientsBySearch, setErrorpacientsBySearch] = useState(false);

  const previousSearch = useRef(search);

  const getPacientsBySearch = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;
    try {
     setLoadingpacientsBySearch(true);
     setErrorpacientsBySearch(null);
      previousSearch.current = search;
      const newPacients = await getPacientesListBySearch({ search });
      console.log(newPacients);
      setpacientsBySearch(newPacients);
    } catch (e) {
        setErrorpacientsBySearch(e.message);
    } finally {
        setLoadingpacientsBySearch(false);
    }
  }, []);
 


  return {
    pacientsBySearch,
    setpacientsBySearch,
    getPacientsBySearch,
    pacientsBySearch,
    loadingpacientsBySearch,
    errorpacientsBySearch
  };
}
