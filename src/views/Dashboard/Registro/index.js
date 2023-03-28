import React, { useState } from 'react';
import { Progress, Input, Button, Box, Text } from "@chakra-ui/react";
import FormStation from './Components/MultiStationForm ';
import FormConfirmationPopup from './Components/FormConfirmationPopup';
import "./Components/FormConfirmationPopup.css"

const MultiStationForm = () => {
  const [currentStation, setCurrentStation] = useState(1);
  const [formData, setFormData] = useState({
    Cliente: {
      Cedula: '',
      Nombre: '',
      Apellido: '',
      Fecha: '',
      Procedencia: '',
      email: '',
      Telefono: ''
    },
    Medico: {
      Nombre: '',
      Apellido: '',
      Especialidad: '',
      email: '',
      Telefono: ''
    },
    Muestra: {
      Tipo: '',
      Fecha: '',
      Hora: '',
      Comentarios: ''
    }
  });
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const handleNextStation = () => {
    if (currentStation < 3) {
      setCurrentStation(currentStation + 1);
    } else {
      setShowConfirmationPopup(true);
    }
  };

  const handlePreviousStation = () => {
    if (currentStation > 1) {
      setCurrentStation(currentStation - 1);
    }
  };
  const nombreEstacion = () => {
    switch (currentStation) {
      case 1:
        nombreEstacion == "Pasiente"
        break;
      case 2:
        nombreEstacion == "Medico"
        break;
      case 3:
        nombreEstacion == "Muestra"
        break;
    }
  };

  const handleStationDataChange = (stationName, field, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [stationName]: {
        ...prevFormData[stationName],
        [field]: value
      }
    }));
  };

  const handleConfirmationPopupConfirm = () => {
    // Aquí podrías enviar los datos a través de una API o guardarlos en una base de datos
    setShowConfirmationPopup(false);
    setCurrentStation(1);
    setFormData({
      Cliente: {
        Cedula: '',
        Nombre: '',
        Apellido: '',
        Fecha: '',
        email: '',
        Telefono: ''
      },
      Medico: {
        Nombre: '',
        Apellido: '',
        Especialidad: '',
        email: '',
        Telefono: ''
      },
      Muestra: {
        Tipo: '',
        Fecha: '',
        Hora: '',
        Comentarios: ''
      }
    });
  };

  const handleConfirmationPopupBack = () => {
    setShowConfirmationPopup(false);
    setCurrentStation(3);
  };

  return (
    <Box boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'40px'} borderRadius='20px'  m={'140px 30px 0 30px'} className="multistation-form">
      <Box className="form-header">
        {/* <Text fontSize="xl">
          {(() => {
            switch (currentStation) {
              case 1:
                return "Pasiente";
              case 2:
                return "Medico";
              case 3:
                return "Muestra";
              default:
                return "";
            }
          })()}
        </Text> */}

      </Box>
      {currentStation === 1 && (
        <FormStation stationName="Cliente" formData={formData.Cliente} onChange={handleStationDataChange} onNext={handleNextStation} />
      )}
      {currentStation === 2 && (
        <FormStation stationName="Medico" formData={formData.Medico} onChange={handleStationDataChange} onNext={handleNextStation} onPrevious={handlePreviousStation} />
      )}
      {currentStation === 3 && (
        <FormStation stationName="Muestra" formData={formData.Muestra} onChange={handleStationDataChange} onPrevious={handlePreviousStation} />
      )}
      {showConfirmationPopup && (
        <FormConfirmationPopup formData={formData} onConfirm={handleConfirmationPopupConfirm} onBack={handleConfirmationPopupBack} />
      )}
    </Box>
  );
};

export default MultiStationForm;
