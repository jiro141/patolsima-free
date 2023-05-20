import { React, useState } from "react";
import {
    Box,
    Text,
    Grid,
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CloseButton,
    useBreakpointValue,
    Select
} from "@chakra-ui/react";
import FacturaTerceros from "./FacturaTerceros";


const ModalAbonar = () => {
    //modal
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    //tamaños de modal
    return (
        <Box marginTop={"-50px"}>
            <Text margin={'10px 0 20px 0'} textAlign={'center'}>¿Cuánto desea abonar?</Text>
            <Grid margin={'10px 0 10px 0'} gap={"2px"} templateColumns={"1fr 1fr"}>
                <Box>
                    <Text textAlign='center'>Monto total: </Text>
                </Box>
                <Box>
                    <Text textAlign='center'> 20$ -  4562 Bs</Text>
                </Box>
            </Grid>
            <Grid gap={"20px"} templateColumns={"1.5fr 2fr"}>
                <Box>
                    <Text textAlign={'left'}>Monto a abonar:</Text>
                </Box>
                <Grid margin={'10px 0 10px 0'} gap={'10px'} templateColumns={"1fr 1fr"}>
                    <Input marginTop={'-5px'} maxH={'60%'}></Input>
                    <Select height={'100%'} width="100%" borderRadius="20px" fontSize="14px" backgroundColor="#137798" color="whiteAlpha.900">
                        <option>Dólar</option>
                        <option>Bolívares</option>
                    </Select>
                </Grid>
            </Grid>
            <Box textAlign={'center'} w={'100%'}>
                <Button
                    padding={'0px 25px'}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'>
                    Abonar
                </Button>
            </Box>
        </Box>
    );
}
export default ModalAbonar;