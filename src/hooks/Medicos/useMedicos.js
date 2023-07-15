
import { useCallback, useMemo, useState } from "react";
import {getMedicosList} from "../../api/controllers/medicos"
export function useMedicos() {
  const [medicos, setMedicos] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [tabla, setTabla] = useState([]);

  const getMedicos = useCallback(async () => {
    try {
      setloading(true);
      seterror(null);
      const medicosList = await getMedicosList();
      // console.log(pacientesList)
      setMedicos(medicosList);
      setTabla(medicosList)
      // console.log(pacientesList);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }, []);
 

  return { setTabla,medicos, getMedicos, loading, error, setMedicos,tabla};
}
