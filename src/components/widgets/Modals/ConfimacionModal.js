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
import { postNotaCredito } from "api/controllers/facturas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNotadePago } from "api/controllers/facturas";
import { Title } from "../Texts";
import { useFacturas } from "hooks/Facturas/useFacturas";
// import { Title } from "../Texts";
export default function ConfimacionModal({
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
        try {
            const sendAbonar = await postNotaCredito(facturasDetail.id);
            //console.log(sendAbonar);
            if (sendAbonar) {
                toast.success("¡La nota de credito fue generada correctamente!", {
                    autoClose: 1000,
                });
                setPdfContent(sendAbonar);
                setShowModal(false);
                setOpenModal(true)
                setAbonarSend(true)
                //getStudyDetail()
            } else {
                toast.error("¡Hubo un error al acreditar la factura!", {
                    autoClose: 1000,
                });
            }
        } catch (error) {
            toast.error(error.menssage, {
                autoClose: 1000,
            });
        }


        // } else {


        ///bolivare




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
                        <Box textAlign={'center'} display={'flex'} width={'100%'} justifyContent={'center'}>
                            <Title title={'¿Desea generar nota de credito?'} />
                        </Box>
                        <Grid gap={"10px"} templateColumns={"repeat(2,1fr)"}>
                            <GeneralButton text="Si" handleClick={handleSubmit} />
                            <GeneralButton text="No" type="outline" handleClick={() => setShowModal(false)} />

                        </Grid>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}