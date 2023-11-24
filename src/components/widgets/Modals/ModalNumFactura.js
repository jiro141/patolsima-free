import React, { useEffect, useRef, useState } from "react";
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
  Input,
  Select,
  Badge,
  CloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import { getNumeroFacturas } from "api/controllers/facturas";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Title } from "../Texts";
import InputOverall from "../Inputs/InputOverall";
import { useFormik } from "formik";
import { postFactura } from "api/controllers/facturas";
import ModalPrint from "./ModalPrintFact";

export default function ModalNumFactura({
  isOpen,
  setShowModal,
  study,
  setPdfContentFact,
  pdfContentFact,
  setOpenModalFact2,
  openModalFact2
}) {
  const [numero, setNumero] = useState('');
  console.log(numero, 'numero');
  const enviar = async () => {
    try {
      const facturaPost = await postFactura(study?.id);
      if (facturaPost) {
        toast.success("¡La factura se ha generado con éxito!", {
          autoClose: 1000,
        });
        console.log(facturaPost);
        setPdfContentFact(facturaPost.uri);
        setOpenModalFact2(true);
        setShowModal(false);
      } else {
        toast.error("¡Hubo un error al generar la factura!", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  const peticionGet = async () => {
    try {
      const numeroFactura = await getNumeroFacturas()
      // console.log(numeroFactura);
      setNumero(numeroFactura + 1);
      // formik.setFieldValue("n_factura", numeroFactura + 1);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    peticionGet();
  }, []);

  //console.log(facturasDetail);
  return (
    <>
      <Modal size={"sm"} maxWidth="100%" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent
          padding={"10px"}
          marginTop={"15%"}
          bg="#ffff"
          borderRadius={"20px"}
        >
          <ModalHeader>
            <Button
              borderRadius={'50%'}
              colorScheme="blue"
              width="40px"
              height="40px"
              marginLeft={'92%'}
              marginTop={'-80px'}
              bgColor={'#137797'}
              color='#ffff'
              onClick={() => setShowModal(false)}
            >
              <CloseButton />
            </Button>
          </ModalHeader>
          <ModalBody>
            <Box marginTop={"-50px"}>
              <Box textAlign={'center'} >
                <Title title={'La siguiente factura sera:'} />
              </Box>

              <Box flexDirection={'row'} width={"100%"} display={'flex'} alignItems={'center'} justifyContent={'center'} alignContent={'center'}>
                <Text fontSize={'20px'} mr={'5px'} marginY={'8%'} >Factura #: {numero}</Text>
                <Box ml={'2px'}>

                  {/* <InputOverall
                    placeholder="548692"
                    //disabled={estudioID || estudioId2 ? false : true}
                    name={"n_factura"}
                    value={formik.values.n_factura}
                    onChange={(e) =>
                      formik.setFieldValue("n_factura", e.target.value)
                    }
                    errors={formik.errors.n_factura}

                  /> */}
                </Box>
              </Box>

              <Box textAlign={"center"} w={"100%"}>
                <Button
                  marginBottom={"10px"}
                  padding={"0px 25px"}
                  borderRadius={"20px"}
                  bgColor={"#137797"}
                  color="#ffff"
                  onClick={enviar}
                >
                  Generar factura
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <ModalPrint text={'¿Desea descargar la factura ?'} isOpen={openModalFact2} setOpenModal={setOpenModalFact2} pdfContent={pdfContentFact} />
    </>

  );
}