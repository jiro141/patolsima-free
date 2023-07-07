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

export default function AddFileModal({ isOpen, setOpenModal }) {
 // const [confirmDocument, setconfirmDocument] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { estudioID } = useContext(
    ModoVisualizacionContext
  );
  const fileInputRef = useRef(null);
 
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async() => {
    fileInputRef.current.click();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log(selectedFile)
      try {
      const resAdjunto= postMuestraAdjunto(estudioID,formData)
      console.log(resAdjunto)
      } catch (error) {
        console.log(error)
      }
    }
  };
  const handleConfirm = () => {
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
            <Text textAlign={"center"}>{`¿Desea adjuntar documento?`}</Text>
            <FormControl display="flex" alignItems="center" justifyContent={'center'} marginTop={"5px"}>
              <input type="file" accept=".pdf" onChange={handleFileChange} 
               style={{ display: 'none' }} ref={fileInputRef}/>
                <FormLabel>{selectedFile ? selectedFile.name : ''}</FormLabel>
              <Button type="button" onClick={handleUpload}>
                <BsFolderPlus color="#137797" />
              </Button>
            </FormControl>
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
