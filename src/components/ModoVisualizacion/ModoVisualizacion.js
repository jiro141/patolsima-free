import React, { createContext, useState } from 'react';

const ModoVisualizacionContext = createContext();

export function ModoVisualizacionProvider({ children }) {
  const [modoVisualizacion, setModoVisualizacion] = useState('tarjeta');
  const [dataPaciente, setDataPaciente] = useState({});
  const [dataMedico, setDataMedico] = useState({});
  const [pacienteID, setPacienteID] = useState('');

  const setFormValues = (values, tipo) => {
    if (tipo === 'paciente') {
      setDataPaciente((prevValues) => ({
        ...prevValues,
        ...values,
      }));
    } else if (tipo === 'medico') {
      setDataMedico((prevValues) => ({
        ...prevValues,
        ...values,
      }));
    }
  };
  const cambiarModoVisualizacion = (nuevoModo) => {
    setModoVisualizacion(nuevoModo);
  };

  return (
    <ModoVisualizacionContext.Provider
      value={{
        modoVisualizacion,
        cambiarModoVisualizacion,
        setFormValues,
        dataPaciente,
        dataMedico,
        pacienteID,
        setPacienteID
      }}
    >
      {children}
    </ModoVisualizacionContext.Provider>
  );
}

export default ModoVisualizacionContext;