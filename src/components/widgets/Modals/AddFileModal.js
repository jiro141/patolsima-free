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
import { useState } from "react";
import { BsFolderPlus } from "react-icons/bs";
import { postMuestraAdjunto } from "api/controllers/estudios";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import { useContext } from "react";
import MainContext from "context/mainContext/MainContext";

export default function AddFileModal({ isOpen, setOpenModal }) {
  const {
    activeTab,
    setActiveTab,
    setTwoState,
    twoState,
    setTwoStatee,
  } = useContext(MainContext);
 // const [confirmDocument, setconfirmDocument] = useState(false);


  const handleConfirm = () => {
    setActiveTab(activeTab + 1)
    setOpenModal(false);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

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
            <Text textAlign={"center"}>{`¿Desea crear otro estudio?`}</Text>
           
            <Grid gap={"4px"} templateColumns={"repeat(2,1fr)"}>
              <GeneralButton text="Si" handleClick={handleConfirm} />
              <GeneralButton
                text="No"
                type="outline"
                handleClick={handleClose}
              />
            </Grid>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
