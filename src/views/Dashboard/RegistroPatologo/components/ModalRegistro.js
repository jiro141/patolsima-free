import { React, useState } from "react";
import {
    Box,
    SimpleGrid,
    Text,
    useColorModeValue,
    Badge,
    Heading,
    Grid,
    GridItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Select,
    Input,
} from "@chakra-ui/react";
import Fecha from "components/Sidebar/Fecha";


const ModalRegistro = () => {
    return (
        <Box marginTop={'-50px'}>
            <Text margin={'10px'} color={'gray.900'} fontSize={'20px'} >Información General</Text>
            <Grid templateColumns={"repeat(3,1fr)"}>
                <Box>
                    <Box margin={'10px'}>
                        <Text color={"gray.800"}>Paciente</Text>
                        <Text color={'gray.600'}>Amelia Amigo Jordan</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text color={'gray.800'}>Fecha</Text>
                        <Text color={'gray.600'}>15/03/1986</Text>
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text color={'gray.800'}>Cedula de Identidad</Text>
                        <Text color={'gray.600'}>26651254</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text color={'gray.800'}>Medico Tratante</Text>
                        <Text color={'gray.600'}>Jose Salmeron</Text>
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text color={'gray.800'}>Telefono</Text>
                        <Text color={'gray.600'}>26651254</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text color={'gray.800'}>Telefono</Text>
                        <Text color={'gray.600'}>26565462</Text>
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
                        <Text fontWeight={'bold'}>Tipo de muestra 2</Text>
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
        </Box>
    );
}
export default ModalRegistro;