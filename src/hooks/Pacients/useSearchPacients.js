import { useState, useEffect} from "react";

export function useSearchPacients(){
    const [searchci, setsearchci] = useState('')
    const [errorci, seterrorci] = useState('')
   useEffect(() => {
    
   
     return () => {
      seterrorci('')
     }
   }, [])
   

    useEffect(() => {
      if(searchci===''){
        seterrorci('')
      }else
      if(searchci.includes('V-') || searchci.includes('E-') ){
       seterrorci('')
        return
      }else{
        seterrorci('La cedula debe incluir el "V-" o "E-" ')
      }
      
      //seterrorci('')
      //seterrorci(null)
    }, [searchci])
    return{searchci,setsearchci,errorci,seterrorci}
}