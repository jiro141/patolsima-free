import { getPacientesList,getPacientesDetail } from "api/controllers/pacientes";
import { useCallback, useMemo, useState } from "react";

export function usePacients() {
  const [pacients, setpacients] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [pacientesEstatico, setPacientesEstatico] = useState([]);
  const [pacientsID, setPacientsID]=useState('')
  //aqui no es

  const getPacients = useCallback(async () => {
    try {
      setloading(true);
      seterror(null);
      const pacientesList = await getPacientesList();
      // console.log(pacientesList)
      setpacients(pacientesList);
      setPacientesEstatico(pacientesList)
      // console.log(pacientesList);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }, []);
 

  return { pacients, getPacients, loading, error, setpacients,pacientesEstatico};
}
