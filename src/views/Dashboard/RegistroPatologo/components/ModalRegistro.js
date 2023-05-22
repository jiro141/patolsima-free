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
                        <Text fontSize={'17px'}>Paciente</Text>
                        <Text >Amelia Amigo Jordan</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Fecha</Text>
                        <Text >15/03/1986</Text>
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Cedula de Identidad</Text>
                        <Text >26651254</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Medico Tratante</Text>
                        <Text >Jose Salmeron</Text>
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Telefono</Text>
                        <Text color={'gray.600'}>26651254</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Telefono</Text>
                        <Text >26565462</Text>
                    </Box>
                </Box>
            </Grid>
            <Text margin={'10px'} fontSize={'20px'}>Información de estudio</Text>
            <Grid templateColumns={"repeat(3,1fr)"}>
                <Box>
                    <Box margin={'10px'}>
                        <Text >Numero de muestra</Text>
                        <Text>Amelia Amigo Jordan</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text >Tipo de muestra</Text>
                        <Text>15//03/1986</Text>
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text >tipo de estudio</Text>
                        <Text>26651254</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Tipo de muestra 2</Text>
                        <Text>Jose Salmeron</Text>
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                    <Text textColor={'transparent'} >Tipo de muestra 3</Text>
                        <Text textColor={'transparent'}>26565462</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text >Tipo de muestra 3</Text>
                        <Text>26565462</Text>
                    </Box>
                </Box>
            </Grid>
            <Grid margin={'30px 10px 20px 10px'} templateColumns={'repeat(3,1fr)'} gap={'20px'}>
                <Select color="gray.400" defaultValue="Informes anteriores">
                    <option hidden >Informes anteriores</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                </Select>
                <Select color="gray.400" defaultValue="Anexos">
                    <option hidden >Anexos</option>
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
                marginBottom={{ lg: '-35px', md: '-8%', sm: '-10%' }}
                marginLeft={{ lg: '620px', md: '70%', sm: '77%' }}
                borderRadius={'20px'}
                bgColor={'#137797'}
                color='#ffff'>
                Procesar
            </Button>
        </Box>
    );
}
export default ModalRegistro;