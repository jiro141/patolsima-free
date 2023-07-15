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
  Input,
  Select,
  Badge,
  CloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import GeneralButton from "../Buttons/GeneralButton";
import { useContext } from "react";
import { BsFillCheckCircleFill, BsFolderPlus } from "react-icons/bs";
import MainContext from "context/mainContext/MainContext";
import { postAbonar } from "api/controllers/facturas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddAbonarModal({
  isOpen,
  setShowModal,
  idOrden,
  facturasDetail,
}) {
  const [valueInput, setvalueInput] = useState([]);

  const handleSubmit = async () => {
    const newObj = {
      orden: facturasDetail.id,
      monto_usd: valueInput,
    };
    console.log('heree endpoint')
    try {
      const sendAbonar = await postAbonar(newObj);
      console.log(sendAbonar);
      if (sendAbonar) {
        toast.success("¡El abono fue guardado correctamente!", {
          autoClose: 1000,
        });
        // setPagoId(pacientePut);
        //onPagoIdChange(pacientePut);
        setShowModal(false);
      } else {
        toast.error("¡Hubo un error al abonar la factura!", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error.menssage, {
        autoClose: 1000,
      });
    }
  };
  //console.log(facturasDetail);
  return (
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
                            marginTop={'-60px'}
                            bgColor={'#137797'}
                            color='#ffff'
                           onClick={()=>setShowModal(false)}
                           >
                            <CloseButton />
                        </Button>
                    </ModalHeader>
        <ModalBody>
          <Box marginTop={"-50px"}>
            <Text margin={"10px 0 20px 0"} textAlign={"center"}>
              ¿Cuánto desea abonar?
            </Text>
            <Grid
              margin={"10px 0 10px 0"}
              gap={"2px"}
              templateColumns={"1fr 1fr"}
            >
              <Box>
                <Text textAlign="center">Monto total: </Text>
              </Box>
              <Box>
                <Text textAlign="center">
                  <Badge>
                    {facturasDetail ? facturasDetail?.balance.por_pagar_usd : ""}{" "}
                    $ -
                  </Badge>
                  <Badge>{facturasDetail ? facturasDetail?.balance.por_pagar_bs: ''}Bs</Badge>
                </Text>
              </Box>
            </Grid>
            <Grid gap={"3px"} templateColumns={"1.5fr 2fr"}>
              <Box width={"100%"}>
                <Text textAlign={"left"}>Monto a abonar:</Text>
              </Box>
              <Grid
                margin={"10px 0 10px 0"}
                gap={"5px"}
                templateColumns={"1fr 1fr"}
              >
                <Input
                  marginTop={"-5px"}
                  maxH={"60%"}
                  value={valueInput}
                  onChange={(e) => setvalueInput(e.target.value)}
                />
                <Select
                  width={"100px"}
                  style={{ border: "1px solid" }}
                  marginTop={"-8px"}
                  height={"90%"}
                  borderRadius="20px"
                  fontSize="16px"
                  backgroundColor="#137798"
                  color="whiteAlpha.900"
                >
                  <option style={{ color: "black" }}>Dólar</option>
                  <option style={{ color: "black" }}>Bolivar</option>
                </Select>
              </Grid>
            </Grid>
            <Box textAlign={"center"} w={"100%"}>
              <Button
                marginBottom={"10px"}
                padding={"0px 25px"}
                borderRadius={"20px"}
                bgColor={"#137797"}
                color="#ffff"
                onClick={handleSubmit}
              >
                Abonar
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
