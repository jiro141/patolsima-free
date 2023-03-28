import {useEffect, useState} from 'react';
import {} from '@chakra-ui'



function BusquedaPaciente() 
    const [pasientes,setPasientes] =useState([]);
    const [tablaPasientes,setTablaPasientes] =useState([]);
    const [busqueda,setBusqueda] =useState("");
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(jsonData => setData(jsonData));
      }, []);
    return(
        <>

        </>
    );  
};
export default BusquedaPaciente;