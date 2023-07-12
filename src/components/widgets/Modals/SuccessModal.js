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

export default function SuccessModal({ isOpen, setOpenModal }) {
  const {
    activeTab,
    setActiveTab,
  } = useContext(MainContext);

  const handleConfirmClose = () => {
    setOpenModal(false);
    window.location.reload();
  };
  const handleClose = () => {
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
          <Box  width={'auto'} marginTop={"20px"} flexDirection={'column'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={'20px'} textAlign={"center"}>{`¡Registro completado con exito!`}</Text>
           <div style={{alignItems:'center',marginTop:'20px'}}>
           <BsFillCheckCircleFill color="#137797" size={'50px'} />
           </div>
            <Grid justifyContent={'center'} templateColumns={"repeat(2,1fr)"}>
            <GeneralButton
                text="Crear otro estudio"
                type="outline"
                handleClick={handleClose}
              />
              <GeneralButton text="Salir de registro" handleClick={handleConfirmClose} />
              
            </Grid>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
