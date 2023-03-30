import React, { useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from "@chakra-ui/react";
import { motion } from "framer-motion";
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

  //tabs para los nombres

  const MotionTab = motion(Tab);

  const CustomTab = ({ title, isActive }) => {
    return (
      <MotionTab
        margin="0 5px 0 5px"
        border="none"
        bg={isActive ? "#9BC5D3" : "#9BC5D3"}
        color={isActive ? "#FFFF" : "transpared"}
        borderRadius={isActive ? "40px" : "40%"}
        padding={isActive ? "20px 200px" : "15px"}
        fontSize={isActive ? "20px" : "0px"}
        width="50px"
        height="50px"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
      >
        {title}
      </MotionTab>
    );
  };
  return (
    <>
      <Tabs onChange={index => setCurrentStation(index)}>
        <TabList border={'none'} margin={'80px 30px 20px 30px'}>
          <CustomTab  title="Cliente" isActive={currentStation === 1} />
          <CustomTab title="Médico" isActive={currentStation === 2} />
          <CustomTab title="Muestra" isActive={currentStation === 3} />
        </TabList>
        <TabPanels>
          {currentStation === 1 && (
            <TabPanel>
              <Box boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'40px'} borderRadius='20px' m={'10px 30px 100px 30px'} className="multistation-form">
                <FormStation stationName="Cliente" formData={formData.Cliente} onChange={handleStationDataChange} onNext={handleNextStation} />
              </Box>
            </TabPanel>
          )}
          {currentStation === 2 && (
            <TabPanel>
              <Box boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'40px'} borderRadius='20px' m={'10px 30px 100px 30px'} className="multistation-form">
                <FormStation stationName="Medico" formData={formData.Medico} onChange={handleStationDataChange} onNext={handleNextStation} />
              </Box>
            </TabPanel>
          )}
          {currentStation === 3 && (
            <TabPanel>
              <Box boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'40px'} borderRadius='20px' m={'10px 30px 100px 30px'} className="multistation-form">
                <FormStation stationName="Muestra" formData={formData.Muestra} onChange={handleStationDataChange} onNext={handleNextStation} />
              </Box>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs >
    </>
  );
};

export default MultiStationForm;
