import React, { useRef, useState } from "react";
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
import { BsWhatsapp} from "react-icons/bs";
import MainContext from "context/mainContext/MainContext";
import { Title } from "../Texts";
import '../../../css/style.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateInformeCompletePdf } from "api/controllers/informes";

export default function ModalSendWp({ isOpen, setOpenModal, type, text,pdfContent,detailEstudio }) {
  console.log(detailEstudio?.medico_tratante?.telefono_celular);
 
 
  const handleSendMessage = async() => {
  const res=await  generateInformeCompletePdf(detailEstudio?.id)
  
  if(res){
    const phoneNumber = detailEstudio?.paciente?.telefono_celular ? detailEstudio?.paciente?.telefono_celular :'+584247423183'; 
    const message = `Desde Laboratorios Patolsima le informamos que el estudio ${detailEstudio?.codigo} del paciente ${detailEstudio?.paciente?.nombres} ${detailEstudio?.paciente?.apellidos}, CI ${detailEstudio?.paciente?.ci
    } , ha sido completado, y puede acceder a él a través del siguiente link:  ${res.uri} `; 
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }else{
    toast.error("¡Hubo un error al generar el informe digital!", {
      autoClose: 1000,
    });
  }
    
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
           <Box display={'flex'} justifyContent={'center'}>
           <Title title={'¿Deseas enviarlo por Whatsapp?'} />
           </Box>
           


            <div style={{ alignItems: "center", marginTop: "20px" }}>
              <BsWhatsapp color="#137797" size={"50px"} />
            </div>
            <Box style={{display:'flex',  width:'100%'}}>
            <div
  className="btnPrint"
 onClick={handleSendMessage}
> 
<Text>Si</Text>
</div>
           {/* <GeneralButton text="Si"  handleClick={handleSendMessage} />*/}
            <GeneralButton text="No" type="downloadOutline" handleClick={()=>setOpenModal(false)} />
              
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}