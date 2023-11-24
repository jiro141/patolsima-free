import React, { useState } from "react";
import {
    Box,
    Text,
    Grid,
    Button,
} from "@chakra-ui/react";
import InputCalendar from "components/widgets/Inputs/InputCalendar";
import { Title } from "components/widgets/Texts";
import { toast } from "react-toastify";
import { postReporte } from "api/controllers/facturas";
import { format } from 'date-fns';

const Reporte = ({ toggleModalConfirmacion, facturasDetail, pago }) => {
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };

    // Utilizando new Date() como estado inicial en useState para las fechas
    const [dateI, onChangeI] = useState(new Date());
    const [dateF, onChangeF] = useState(new Date());
    const handleDateChange = (dateI) => {
        onChangeI(dateI);
    };

    const handleDateChange2 = (dateF) => {
        onChangeF(dateF);
    };

    const [onOpenCalendar, setOpenCalendar] = useState(false);
    const [onOpenCalendar2, setOpenCalendar2] = useState(false);
    const [v, setV] = useState(true);

    const reportePost = async () => {
        try {
            const res = await postReporte(formatDate(dateI), formatDate(dateF));
            if (res) {
                const nuevaPestana = window.open(res.baseURL + res.requestURL, '_blank');
                toast.success('Tu reporte se ha generado con éxito', { autoClose: 1800 });
            } else {
                toast.error('Error al generar reporte', { autoClose: 1000 });
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 1000 });
        }
    };

    return (
        <Box marginTop={"-10px"} textAlign={'center'}>
            <Box textAlign={'center'}>
                <Title
                    title={'¿Desea generar reporte?'}
                />
            </Box>
            <Grid gap={"10px"} templateColumns={"repeat(2,1fr)"}>
                <Box marginY={'20px'} marginX={'10px'}>
                    <Text textAlign={'center'}>Fecha inicial</Text>
                    <InputCalendar
                        v={v}
                        onChangeI={handleDateChange}
                        onOpenCalendar={onOpenCalendar}
                        setOpenCalendar={setOpenCalendar}
                        value={dateI}
                    />
                </Box >
                <Box marginY={'20px'} marginX={'10px'}>
                    <Text textAlign={'center'}>Fecha final</Text>
                    <InputCalendar
                        v={v}
                        onChangeF={handleDateChange2}
                        onOpenCalendar={onOpenCalendar2}
                        setOpenCalendar={setOpenCalendar2}
                        value={dateF}
                    />
                </Box>
            </Grid>
            <Button
                paddingX={'50px'}
                marginX={'10px'}
                marginY={'10px'}
                color={'whiteAlpha.900'}
                borderColor={'gray.400'}
                background={'#137797'}
                borderRadius={'20px'}
                onClick={() => {
                    reportePost();
                }}>Generar</Button>
        </Box>
    );
}

export default Reporte;
