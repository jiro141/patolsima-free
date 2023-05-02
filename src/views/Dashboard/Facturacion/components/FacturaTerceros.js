import { React, useState } from "react";
import {
    Box,
    Text,
    Grid,
    Select,
    Input,
    Button
} from "@chakra-ui/react";


const FacturaTerceros = () => {
    return (
        <Box>
            <Text marginTop={'-10%'} fontSize={'20px'}>Datos de cliente</Text>
            <Grid gap={'20px'} margin={'10px'} templateColumns={{lg:'repeat(2,1fr)',sm:'repeat(1,1fr)'}}>
                <Input
                    placeholder='CI/RIF'
                    type="text"
                    name="ci"
                />
            </Grid>
            <Grid margin={'10px'}>
                <Input
                    placeholder='Nombre y apellido o razón social'
                    type="text"
                    name="nombre"
                />
            </Grid>
            <Grid margin={'10px'} gap={'20px'} templateColumns={{lg:'repeat(2,1fr)',sm:'repeat(1,1fr)'}}>
                <Input
                    placeholder='Télefono de contacto'
                    type="text"
                    name="telefono"
                />
                <Input
                    placeholder='Procedencia'
                    type="text"
                    name="ci"
                />
            </Grid>
            <Button
                    marginBottom={{ lg: '-5%', md: '-8%', sm: '-10%' }}
                    marginLeft={{ lg: '82%', md: '70%', sm: '77%' }}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'>
                    Aceptar
                </Button>
        </Box>
    );
}
export default FacturaTerceros;