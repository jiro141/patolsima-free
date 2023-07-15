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
import { BsBoxArrowInDown } from "react-icons/bs";
import MainContext from "context/mainContext/MainContext";

export default function ModalPrint({ isOpen, setOpenModal, type, text,pdfContent }) {
  const handleConfirmClose = () => {
    if(pdfContent){

    }
    //setOpenModal(false);
    // window.location.reload();
  };
  const handleClose = () => {
    setOpenModal(false)
  };

  return (
    <Modal size={"sm"}  isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        padding={"10px"}
        marginTop={"15%"}
        bg="#ffff"
        borderRadius={"20px"}
      >
        <ModalBody>
          <Box
            width={"auto"}
            marginTop={"20px"}
            flexDirection={"column"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text fontSize={"20px"} textAlign={"center"}>
              {text}
            </Text>
            <div style={{ alignItems: "center", marginTop: "20px" }}>
              <BsBoxArrowInDown color="#137797" size={"50px"} />
            </div>
            <Box style={{display:'flex',  width:'100%'}}>
          
            <GeneralButton text="Si" type="download" pdfContent={pdfContent} />
            <GeneralButton text="No" type="downloadOutline" handleClick={handleClose} />
              
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
