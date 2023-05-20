import { React, useState } from "react";
import {
    Box,
    Text,
    Grid,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CloseButton,
    useBreakpointValue
} from "@chakra-ui/react";
import FacturaTerceros from "./FacturaTerceros";


const Confirmacion = () => {
    //modal
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    //tamaños de modal
    return (
        <Box marginTop={"20px"}>
            <Text textAlign={'center'}>¿Desea emitir nota de entrega?</Text>
            <Grid gap={"10px"} templateColumns={"repeat(2,1fr)"}>
               <Button
                    marginX={'10px'}
                    marginY={'30px'}
                    color={'whiteAlpha.900'}
                    borderColor={'gray.400'}
                    background={'#137797'}
                    borderRadius={'20px'}>Si</Button>
                     <Button
                    marginX={'10px'}
                    marginY={'30px'}
                    border={'solid'}
                    color={'#137797'}
                    borderColor={'#137797'}
                    background={'none'}
                    borderRadius={'20px'}>No</Button>
            </Grid>
        </Box>
    );
}
export default Confirmacion;