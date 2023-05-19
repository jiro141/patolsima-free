import React, { createContext, useState } from 'react';

const ModoVisualizacionContext = createContext();

export function ModoVisualizacionProvider({ children }) {
  const [modoVisualizacion, setModoVisualizacion] = useState('tarjeta');

  const cambiarModoVisualizacion = (nuevoModo) => {
    setModoVisualizacion(nuevoModo);
  };

  return (
    <ModoVisualizacionContext.Provider value={{ modoVisualizacion, cambiarModoVisualizacion }}>
      {children}
    </ModoVisualizacionContext.Provider>
  );
}

export default ModoVisualizacionContext;
