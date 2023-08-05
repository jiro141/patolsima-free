import { getStudiesListSearch } from "api/controllers/estudios";
import MainContext from "context/mainContext/MainContext";
import { useContext } from "react";
import { useCallback,  useRef, useState } from "react";

export function useSearchMuestras({ searchMuestra }) {
 // const [muestrasBySearch, setMuestrasbySearch] = useState([]);
const { muestrasBySearch, setMuestrasbySearch}= useContext(MainContext)
  const [loadingmuestrasBySearch, setLoadingmuestrasBySearch] = useState(false);
  const [errormuestrasBySearch, setErrormuestrasBySearch] = useState(false);
 
  const previousSearch = useRef(searchMuestra);

  const getMuestrasBySearch = useCallback(async ({ searchMuestra }) => {
    if (searchMuestra === previousSearch.current) return;
    try {
        setLoadingmuestrasBySearch(true);
        setErrormuestrasBySearch(null);
      previousSearch.current = searchMuestra;
      const newMuestras = await getStudiesListSearch({ searchMuestra });
      console.log(newMuestras);
      setMuestrasbySearch(newMuestras);
    } catch (e) {
        setErrormuestrasBySearch(e.message);
    } finally {
        setLoadingmuestrasBySearch(false);
    }
  }, []);
 


  return {
    muestrasBySearch,
    loadingmuestrasBySearch,
    errormuestrasBySearch,
    getMuestrasBySearch


  };
}