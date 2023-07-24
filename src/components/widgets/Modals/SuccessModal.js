import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  Grid,
  FormControl,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import GeneralButton from "../Buttons/GeneralButton";
import { useContext } from "react";
import { BsFillCheckCircleFill, BsFolderPlus } from "react-icons/bs";
import MainContext from "context/mainContext/MainContext";

export default function SuccessModal({ isOpen, setOpenModal, type, setConfirm,confirm }) {
  const {
    activeTab,
    setActiveTab,
  } = useContext(MainContext);

  const handleConfirmClose = () => {
    setOpenModal(false);
    window.location.reload();
   /* if (activeTab !== 3) {
      setConfirm(true);
    }*/
  };
  const handleClose = () => {
    if (type === 'muestra2') {
      // logica para resetear el form y agregar otra muestra
    }
    setActiveTab(activeTab + 1)
    setOpenModal(false);
  };

  return (
    <Modal
      size={"md"}
      maxWidth="100%"
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent padding={'10px'} marginTop={"15%"} bg="#ffff" borderRadius={"20px"}>
        <ModalBody>
          <Box width={'auto'} marginTop={"20px"} flexDirection={'column'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={'20px'} textAlign={"center"}>{`¡Registro completado con exito!`}</Text>
            <div style={{ alignItems: 'center', marginTop: '20px' }}>
              <BsFillCheckCircleFill color="#137797" size={'50px'} />
            </div>
            <Grid justifyContent={'center'} templateColumns={activeTab === 3 ? "1fr" : "repeat(2,1fr)"}>
              {/* Condición para mostrar el botón "Crear otro estudio" solo cuando activeTab no sea igual a 3 */}
              {activeTab !== 3 && (
                <GeneralButton
                  text="Crear otro estudio"
                  type="outline"
                  handleClick={handleClose}
                />
              )}
              <GeneralButton text="Salir de registro" handleClick={handleConfirmClose} />
            </Grid>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
