import { React, useState } from "react";
import {
    Box,
    Text,
    Grid,
    Select,
    Input,
    Button
} from "@chakra-ui/react";


const ModalRegistro = () => {
    return (
        <Box marginTop={'-50px'}>
            <Text margin={'10px'} color={'gray.900'} fontSize={'20px'} >Información General</Text>
            <Grid templateColumns={"repeat(3,1fr)"}>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontWeight={'bold'}>Paciente</Text>
                        <Text >Amelia Amigo Jordan</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontWeight={'bold'}>Fecha</Text>
                        <Text >15/03/1986</Text>
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontWeight={'bold'}>Cedula de Identidad</Text>
                        <Text >26651254</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontWeight={'bold'}>Medico Tratante</Text>
                        <Text >Jose Salmeron</Text>
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontWeight={'bold'}>Telefono</Text>
                        <Text color={'gray.600'}>26651254</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontWeight={'bold'}>Telefono</Text>
                        <Text >26565462</Text>
                    </Box>
                </Box>
            </Grid>
            <Text margin={'10px'} fontSize={'20px'}>Información de estudio</Text>
            <Grid templateColumns={"repeat(3,1fr)"}>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontWeight={'bold'}>Numero de muestra</Text>
                        <Text>Amelia Amigo Jordan</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontWeight={'bold'}>Tipo de muestra</Text>
                        <Text>15//03/1986</Text>
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontWeight={'bold'}>tipo de estudio</Text>
                        <Text>26651254</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text >Tipo de muestra 2</Text>
                        <Text>Jose Salmeron</Text>
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontWeight={'bold'}>Tipo de muestra 3</Text>
                        <Text>26565462</Text>
                    </Box>
                </Box>
            </Grid>
            <Grid margin={'30px 10px 20px 10px'} templateColumns={'repeat(3,1fr)'} gap={'20px'}>
                <Select defaultValue="Informes anteriores">
                    <option hidden colorScheme="gray.400">Informes anteriores</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                </Select>
                <Select defaultValue="Anexos">
                    <option hidden colorScheme="gray.400">Anexos</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                </Select>
                <Input
                    placeholder='Notas'
                    type="text"
                    name="notas"
                />
            </Grid>
            <Button
                marginBottom={{ lg: '-5%', md: '-8%', sm: '-10%' }}
                marginLeft={{ lg: '88%', md: '70%', sm: '77%' }}
                borderRadius={'20px'}
                bgColor={'#137797'}
                color='#ffff'>
                Procesar
            </Button>
        </Box>
    );
}
export default ModalRegistro;