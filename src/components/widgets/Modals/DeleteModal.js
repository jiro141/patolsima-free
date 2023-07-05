import React from 'react'
import Confirmacion from 'views/Dashboard/RegistroAdministracion/Components/Confirmacion'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Box,
    Text,
    Grid

  } from "@chakra-ui/react";
import GeneralButton from '../Buttons/GeneralButton';


export default function DeleteModal({id,close,eliminar,isOpen,onClose,nombres}) {
  return (
    <Modal
    size={"xs"}
    maxWidth="100%"
    isOpen={isOpen}
   // onClose={onClose}
  >
    <ModalOverlay />
    <ModalContent marginTop={"15%"} bg="#ffff" borderRadius={"20px"}>
      <ModalBody>
      <Box marginTop={"20px"}>
            <Text textAlign={'center'}>{`¿Desea eliminar a ${nombres}?`}</Text>
            <Grid gap={"10px"} templateColumns={"repeat(2,1fr)"}>         
                <GeneralButton text="Si" handleClick={()=>eliminar(id)} />
                <GeneralButton text="No" type="outline" handleClick={close} />

            </Grid>
        </Box>
      </ModalBody>
    </ModalContent>
  </Modal>
  )
}
