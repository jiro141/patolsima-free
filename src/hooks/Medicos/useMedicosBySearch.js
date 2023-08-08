import { getMedicosBySearch } from "api/controllers/medicos";
import { useCallback, useRef, useState } from "react";


export function useMedicoListBySearch({ search }) {
  const [medicosBySearch, setmedicosBySearch] = useState([]);
  const [loadingMedicosBySearch, setLoadingMedicosBySearch] = useState(false);
  const [errorMedicosBySearch, setErrorMedicosBySearch] = useState(false);

  const previousSearch = useRef(search);

  const getMedicsBySearch = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;
    try {
        setLoadingMedicosBySearch(true);
        setErrorMedicosBySearch(null);
      previousSearch.current = search;
      const newMedics = await getMedicosBySearch({ search });
      setmedicosBySearch(newMedics);
    } catch (e) {
        setErrorMedicosBySearch(e.message);
    } finally {
        setLoadingMedicosBySearch(false);
    }
  }, []);
 


  return {
    medicosBySearch,
    loadingMedicosBySearch,
    errorMedicosBySearch,
    getMedicsBySearch,
    setmedicosBySearch
  };
}