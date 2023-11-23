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
// import FacturaTerceros from "./FacturaTerceros";
// import { postNotaPago } from "api/controllers/facturas";
import InputCalendar from "components/widgets/Inputs/InputCalendar";
import { formatDate } from "helpers";
import { Title } from "components/widgets/Texts";

const Reporte = ({ toggleModalConfirmacion, facturasDetail, pago }) => {
    // console.log(facturasDetail), 'confimacion';
    const [date, onChange] = useState(formatDate(new Date()));
    const [onOpenCalendar, setOpenCalendar] = useState(false);
    const [onOpenCalendar2, setOpenCalendar2] = useState(false);
    const [v, setV] = useState(true)
    const notaPago = async () => {
        try {
            const NotaPago = await postNotaPago(facturasDetail.pagos[facturasDetail.pagos.length - 1].id)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box marginTop={"20px"}>
            <Box textAlign={'center'}>
                <Title
                    title={'¿Desea generar reporte?'}
                >
                </Title>
            </Box>
            {/* <Text textAlign={'center'}>¿Desea generar reporte?</Text> */}
            <Grid gap={"10px"} templateColumns={"repeat(2,1fr)"}>
                <Box marginY={'20px'} marginX={'10px'}>
                    <Text textAlign={'center'}>Fecha inicial</Text>
                    <InputCalendar v={v} onOpenCalendar={onOpenCalendar} setOpenCalendar={setOpenCalendar} value={date} />
                </Box >
                <Box marginY={'20px'} marginX={'10px'}>
                    <Text textAlign={'center'}>Fecha final</Text>
                    <InputCalendar v={v} onOpenCalendar={onOpenCalendar2} setOpenCalendar={setOpenCalendar2} value={date} />
                </Box>
                {/* <InputCalendar value={date} /> */}
                <Button
                    marginX={'10px'}
                    marginY={'10px'}
                    color={'whiteAlpha.900'}
                    borderColor={'gray.400'}
                    background={'#137797'}
                    borderRadius={'20px'}
                    onClick={() => {
                        toggleModalConfirmacion();
                        notaPago();
                    }}>General</Button>
                <Button
                    marginX={'10px'}
                    marginY={'10px'}
                    border={'solid'}
                    color={'#137797'}
                    borderColor={'#137797'}
                    background={'none'}
                    borderRadius={'20px'}
                    onClick={toggleModalConfirmacion}>No</Button>
            </Grid>
        </Box>
    );
}
export default Reporte;