
import { getInformesListByCode } from "api/controllers/informes";
import { getMedicosBySearch } from "api/controllers/medicos";
import { useCallback, useRef, useState } from "react";


export function useInformeListBySearch({ search }) {
  const [informeBySearch, setinformeBySearch] = useState([]);
  const [loadingInformeBySearch, setLoadingInformeBySearch] = useState(false);
  const [errorInformesBySearch, setErrorInformesBySearch] = useState(false);

  const previousSearch = useRef(search);

  const getInformesBySearch = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;
    try {
        setLoadingInformeBySearch(true);
        setErrorInformesBySearch(null);
      previousSearch.current = search;
      //console.log(search);
      const newinformes= await getInformesListByCode({ search });
      setinformeBySearch(newinformes);
    } catch (e) {
        setErrorInformesBySearch(e.message);
    } finally {
        setLoadingInformeBySearch(false);
    }
  }, []);
 


  return {
    informeBySearch, 
    setinformeBySearch,
    loadingInformeBySearch, 
    setLoadingInformeBySearch,
    errorInformesBySearch,
     setErrorInformesBySearch,
     getInformesBySearch
  };
}