import React, { createContext, useState } from 'react';

const ModoVisualizacionContext = createContext();

export function ModoVisualizacionProvider({ children }) {
  const [modoVisualizacion, setModoVisualizacion] = useState('tarjeta');
  const [dataPaciente, setDataPaciente] = useState({});
  const [dataMedico, setDataMedico] = useState({});
  const [pacienteID, setPacienteID] = useState('');
  const [medicoID, setMedicoID] = useState('');
  const [estudioID, setEstudioID] = useState('');
  const [estudioId2, setEstudioId2] = useState('');
  const [muestraID, setMuestraID] = useState('');
  const [muestraID2, setMuestraID2] = useState('');

  const setFormEstudioIds=(values)=>{
    setEstudioID((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  }

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
        setPacienteID,
        medicoID, 
        setMedicoID,
        estudioID,
        setEstudioID,
        muestraID,
        setMuestraID,
        setFormEstudioIds,
        estudioId2, setEstudioId2,
        setDataPaciente,
        setDataMedico,
        muestraID2, setMuestraID2
      }}
    >
      {children}
    </ModoVisualizacionContext.Provider>
  );
}

export default ModoVisualizacionContext;
