import { React, useState } from "react";
import {
    Box,
    Text,
    Grid,
    Select,
    Input,
    Button
} from "@chakra-ui/react";
import { putFacturaTerceros } from "api/controllers/facturas";


const FacturaTerceros = ({ study }) => {
    console.log(study);
    //funcion para enviar valores put (falta arreglar 2/6/2023)
    const [data, setData] = useState(
        {
            ci_rif: "",
            razon_social: "",
            telefono_celular: "",
        }
    );
    const onSubmit = async () => {
        try {
            const pacientePut = await putFacturaTerceros(study.id, data)
        }
        catch (error) {
            console.log(error);
        }
    }
    //esta funcion cambia los valores que tienen los inputs
    const cambiarValoresRegistro = (key, value) => {
        setData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };
    return (
        <Box>
            <Text marginTop={'-10%'} fontSize={'20px'}>Datos de cliente</Text>
            <Grid gap={'20px'} margin={'10px'} templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>
                <Input
                    placeholder='CI/RIF'
                    type="text"
                    name="ci"
                    value={data?.ci_rif}
                    onChange={e => cambiarValoresRegistro("ci_rif", e.target.value)}
                />
            </Grid>
            <Grid margin={'10px'}>
                <Input
                    placeholder='Nombre y apellido o razón social'
                    type="text"
                    name="nombre"
                    value={data?.razon_social}
                    onChange={e => cambiarValoresRegistro("razon_social", e.target.value)}
                />
            </Grid>
            <Grid margin={'10px'} gap={'20px'} templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>
                <Input
                    placeholder='Télefono de contacto'
                    type="text"
                    name="telefono"
                    value={data?.telefono_celular}
                    onChange={e => cambiarValoresRegistro("telefono_celular", e.target.value)}
                />
                <Input
                    placeholder='Procedencia'
                    type="text"
                    name="ci"
                />
            </Grid>
            <Button
                marginBottom={{ lg: '-6%', md: '-8%', sm: '-10%' }}
                marginLeft={{ lg: '82%', md: '70%', sm: '77%' }}
                borderRadius={'20px'}
                bgColor={'#137797'}
                color='#ffff'
                onClick={onSubmit}>
                Aceptar
            </Button>
        </Box>
    );
}
export default FacturaTerceros;