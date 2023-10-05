
import { getInformesListBySearch } from "api/controllers/informes";
import { getMedicosBySearch } from "api/controllers/medicos";
import { useCallback, useRef, useState } from "react";


export function useInformeListBySearch({ search }) {
  // console.log('desde el hook',search);
  const [informeBySearch, setinformeBySearch] = useState([]);
  const [loadingInformeBySearch, setLoadingInformeBySearch] = useState(false);
  const [errorInformesBySearch, setErrorInformesBySearch] = useState(false);

  const previousSearch = useRef(search);

  const getInformesBySearch = useCallback(async ({ search }) => {
    // console.log(search, 'valor');
    if (search === previousSearch.current) return;
    try {
        setLoadingInformeBySearch(true);
        setErrorInformesBySearch(null);
      previousSearch.current = search;
      //console.log(search);
      const newinformes= await getInformesListBySearch({ search });
      // console.log('desde la funcion', newinformes);
      setinformeBySearch(newinformes);
      console.log( informeBySearch, 'funcion');
    } catch (e) {
        setErrorInformesBySearch(e.message);
    } finally {
        setLoadingInformeBySearch(false);
        // setinformeBySearch([])
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