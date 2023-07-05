import { useState, useEffect} from "react";

export function useSearchPacients(){
    const [searchci, setsearchci] = useState('')
    const [errorci, seterrorci] = useState('')

    useEffect(() => {
      if(searchci === ''){
        seterrorci('La cedula es obligatoria')
        return
      }
      if(searchci.length < 3){
        seterrorci('La busqueda debe tener al menos 3 caracteres')
      }
      seterrorci(null)
    }, [searchci])
    return{searchci,setsearchci,errorci,seterrorci}
}