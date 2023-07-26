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
  CloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import GeneralButton from "../Buttons/GeneralButton";
import { useContext } from "react";
import { BsFillCheckCircleFill, BsFolderPlus } from "react-icons/bs";
import MainContext from "context/mainContext/MainContext";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import { postOrdenes } from "api/controllers/facturas";

export default function SuccessModal({ isOpen, setOpenModal, type, setConfirm,confirm }) {
  const {
    activeTab,
    setActiveTab,
    ordenId,
  } = useContext(MainContext);
  const { estudioID,muestraID,estudioId2,muestraID2 } = useContext(ModoVisualizacionContext);


  const handleConfirmClose = async() => {    
      if(estudioId2){
        const newOrden2 = {
          estudio_ids: [estudioID,estudioId2]
        }
        const postOrden = await postOrdenes(newOrden2)
      }else{
        const newOrden = {
          estudio_ids: [estudioID]
        }
        const postOrden = await postOrdenes(newOrden)

      } 
    setOpenModal(false);
     const param1 = 'ordenId';
    const url = `/admin/Facturacion/?param1=${param1}`;
     window.location.href = url
  
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
      <ModalContent padding={'5px'} marginTop={"10%"} bg="#ffff" borderRadius={"20px"}>
      <ModalHeader>
            <Button
              borderRadius={"50%"}
              colorScheme="blue"
              width="40px"
              height="40px"
              marginLeft={"95%"}
              marginTop={"-60px"}
              bgColor={"#137797"}
              color="#ffff"
              onClick={()=>setOpenModal(false)}
            >
              <CloseButton />
            </Button>
          </ModalHeader>
        <ModalBody>
          <Box width={'auto'} marginTop={"0px"} flexDirection={'column'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
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
              <GeneralButton text="Ir a Facturación" handleClick={handleConfirmClose} />
            </Grid>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
