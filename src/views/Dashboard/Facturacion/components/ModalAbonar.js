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
import { postAbonar } from "api/controllers/facturas";


const ModalAbonar = ({ facturasDetail, onPagoIdChange,close }) => {
    //modal
    // const [showModal, setShowModal] = useState(false);
    const [pagoId, setPagoId] = useState();
    // const toggleModal = () => {
    //     setShowModal(!showModal);
    // };
    const [data, setData] = useState(
        {
            monto_usd: "",
            orden: facturasDetail.id,

        }
    );
    const onSubmit = async () => {
        try {
            const pacientePut = await postAbonar(data)
            // console.log(pacientePut);
            setPagoId(pacientePut);
            onPagoIdChange(pacientePut); // Llama a la función de callback con el valor de pagoId
        }
        catch (error) {
            console.log(error);
        }
    }
    const cambiarValoresRegistro = (key, value) => {
        setData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };
    // console.log(pagoId);
    return (
        <Box marginTop={"-50px"}>
            <Text margin={'10px 0 20px 0'} textAlign={'center'}>¿Cuánto desea abonar?</Text>
            <Grid margin={'10px 0 10px 0'} gap={"2px"} templateColumns={"1fr 1fr"}>
                <Box>
                    <Text textAlign='center'>Monto total: </Text>
                </Box>
                <Box>
                    <Text textAlign='center'> {facturasDetail.balance.por_pagar_usd} $ -  {facturasDetail.balance.por_pagar_bs} Bs</Text>
                </Box>
            </Grid>
            <Grid gap={"20px"} templateColumns={"1.5fr 2fr"}>
                <Box>
                    <Text textAlign={'left'}>Monto a abonar:</Text>
                </Box>
                <Grid margin={'10px 0 10px 0'} gap={'5px'} templateColumns={"1fr 1fr"}>
                    <Input
                        marginTop={'-5px'}
                        maxH={'60%'}
                        value={data?.monto_usd}
                        onChange={e => cambiarValoresRegistro("monto_usd", e.target.value)}></Input>
                    <Select marginTop={'-8px'} height={'90%'} width="100%" borderRadius="20px" fontSize="16px" backgroundColor="#137798" color="whiteAlpha.900">
                        <option>Dólar</option>
                    </Select>
                </Grid>
            </Grid>
            <Box textAlign={'center'} w={'100%'}>
                <Button
                    marginBottom={'10px'}
                    padding={'0px 25px'}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'
                    onClick={() => {
                        onSubmit();
                        close();
                    }}>
                    Abonar
                </Button>
            </Box>
        </Box>
    );
}
export default ModalAbonar;