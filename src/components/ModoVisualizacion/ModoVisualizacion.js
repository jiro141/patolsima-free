import React, { createContext, useState } from 'react';

const ModoVisualizacionContext = createContext();

export function ModoVisualizacionProvider({ children }) {
  const [modoVisualizacion, setModoVisualizacion] = useState('tarjeta');
  const [pacienteID,setPacienteID]=useState('');

  const cambiarModoVisualizacion = (nuevoModo) => {
    setModoVisualizacion(nuevoModo);
  };

  return (
    <ModoVisualizacionContext.Provider value={{ modoVisualizacion, cambiarModoVisualizacion,pacienteID,setPacienteID }}>
      {children}
    </ModoVisualizacionContext.Provider>
  );
}

export default ModoVisualizacionContext;
