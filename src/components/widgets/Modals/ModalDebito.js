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
import GeneralButton from "../Buttons/GeneralButton";
import { useContext } from "react";
import { BsFillCheckCircleFill, BsFolderPlus } from "react-icons/bs";
import MainContext from "context/mainContext/MainContext";
import { postNotaDebito } from "api/controllers/facturas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNotadePago } from "api/controllers/facturas";
import { Title } from "../Texts";
import { useFacturas } from "hooks/Facturas/useFacturas";

export default function ModalDebito({
    isOpen,
    setShowModal,
    idOrden,
    facturasDetail,
    setOpenModal,
    openModal,
    setPdfContent,
    setAbonarSend
}) {
    // console.log('hola');
    const [valueInput, setvalueInput] = useState([]);
    const [valueInputBs, setvalueInputBs] = useState([]);
    const [selectedOption, setSelectedOption] = useState('dolar');
    const {
        getCambios,
        cambioDelDia,
    } = useFacturas();
    // console.log(setAbonarSend);

    useEffect(() => {
        getCambios();
    }, []);

    const [idPago, setIdPago] = useState('');

    const handleSubmit = async () => {
        // 
        if (selectedOption === 'dolar') {
            let dolarValue = valueInput * cambioDelDia;
            const newObj = {
                orden: facturasDetail.id,
                monto: dolarValue,
            };

            try {
                const sendAbonar = await postNotaDebito(newObj);
                //console.log(sendAbonar);
                if (sendAbonar) {
                    toast.success("¡La nota de debito fue generada correctamente!", {
                        autoClose: 1000,
                    });
                    setPdfContent(sendAbonar);
                    setShowModal(false);
                    setOpenModal(true)
                    setAbonarSend(true)
                    //getStudyDetail()
                } else {
                    toast.error("¡Hubo un error al debitar la factura!", {
                        autoClose: 1000,
                    });
                }
            } catch (error) {
                toast.error(error.menssage, {
                    autoClose: 1000,
                });
            }


        } else {


            ///bolivares


            const newObj = {
                orden: facturasDetail.id,
                monto: parseInt(valueInputBs),
            };

            try {
                const sendAbonar = await postNotaDebito(newObj);
                //console.log(sendAbonar);
                if (sendAbonar) {
                    toast.success("¡La nota de debito fue generada correctamente!", {
                        autoClose: 1000,
                    });
                    setPdfContent(sendAbonar);
                    setShowModal(false);
                    setOpenModal(true)
                    setAbonarSend(true)
                    //getStudyDetail()
                } else {
                    toast.error("¡Hubo un error al debitar la factura!", {
                        autoClose: 1000,
                    });
                }
            } catch (error) {
                toast.error(error.menssage, {
                    autoClose: 1000,
                });
            }

        }


    };
    const generarReciboPago = async () => {
        const resPago = await getNotadePago(idPago)
        if (resPago) {
            setPdfContent(resPago.uri)

        } else {
            return
        }
    }
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
    console.log(selectedOption);

    useEffect(() => {
        if (openModal) {
            generarReciboPago()


        }
    }, [openModal])

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
                        marginTop={'-80px'}
                        bgColor={'#137797'}
                        color='#ffff'
                        onClick={() => setShowModal(false)}
                    >
                        <CloseButton />
                    </Button>
                </ModalHeader>
                <ModalBody>
                    <Box marginTop={"-50px"} >

                        <Box display={'flex'} width={'100%'} justifyContent={'center'}>
                            <Title title={'Monto de la nota de debito'} />
                        </Box>
                        {/* <Grid
                            margin={"10px 0 10px 0"}
                            gap={"2px"}
                            templateColumns={"1fr 1fr"}
                        >
                            <Box>
                                <Text textAlign="center">Monto total: </Text>
                            </Box>
                            {<Box>
                                <Text textAlign="center">
                                    <Badge>
                                        {facturasDetail ? facturasDetail?.balance.por_pagar_usd : ""}{" "}
                                        $ -
                                    </Badge>
                                    <Badge>{facturasDetail ? facturasDetail?.balance.por_pagar_bs : ''}Bs</Badge>
                                </Text>
                            </Box>}
                        </Grid> */}
                        <Grid margin={"20px 0 10px 0"} gap={"3px"} templateColumns={"1.5fr 2fr"}>
                            <Box width={"100%"}>
                                {<Text textAlign={"left"}>Monto a debitar:</Text>}
                            </Box>
                            <Grid
                                margin={"10px 0 10px 0"}
                                gap={"5px"}
                                templateColumns={"1fr 1fr"}
                            >

                                {selectedOption === 'dolar' ?
                                    <Input
                                        marginTop={"-5px"}
                                        maxH={"60%"}
                                        value={valueInput}
                                        onChange={(e) => setvalueInput(e.target.value)}
                                    /> :

                                    <Input
                                        marginTop={"-5px"}
                                        maxH={"60%"}
                                        value={valueInputBs}
                                        onChange={(e) => setvalueInputBs(e.target.value)}
                                    />
                                }
                                <Select
                                    value={selectedOption}
                                    width={"100px"}
                                    style={{ border: "1px solid" }}
                                    marginTop={"-8px"}
                                    height={"90%"}
                                    borderRadius="20px"
                                    fontSize="16px"
                                    backgroundColor="#137798"
                                    color="whiteAlpha.900"
                                    onChange={handleSelectChange}
                                >
                                    <option value={'dolar'} style={{ color: "black" }}>Dólar</option>
                                    <option value={'bolivar'} style={{ color: "black" }}>Bolivar</option>
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
                                Generar
                            </Button>
                        </Box>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}