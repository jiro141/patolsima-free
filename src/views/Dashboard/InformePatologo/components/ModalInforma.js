import { React, useState } from "react";
import {
    Box,
    Text,
    Grid,
    Select,
    Input,
    Button,
    useBreakpointValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CloseButton
} from "@chakra-ui/react";
import ModalDescripcion from "./ModalDescripcion";


const ModalInforme = () => {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    //tamaños de modal
    const size = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
    return (
        <>
            <Grid templateColumns={'2fr 1fr'}>
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
                </Box>
                <Box justifyItems={'center'} marginTop={'-40px'} borderLeft={'solid #2481A0'} height={'90%'}>
                    <Button
                        margin={'10px'}
                        marginBottom={'30px'}
                        border={'solid'}
                        color={'gray.400'}
                        borderColor={'gray.400'}
                        w={'80%'}
                        background={'none'}
                        borderRadius={'10px'}>Registro de cambios</Button>
                    <Button
                        margin={'10px'}
                        border={'solid'}
                        color={'#137798'}
                        borderColor={'#137798'}
                        w={'80%'}
                        background={'none'}
                        borderRadius={'20px'}
                        onClick={toggleModal}>Descripción microscópica</Button>
                    <Button
                        margin={'10px'}
                        border={'solid'}
                        color={'#137798'}
                        borderColor={'#137798'}
                        w={'80%'}
                        background={'none'}
                        borderRadius={'20px'}>Descripción microscópica</Button>
                    <Button
                        margin={'10px'}
                        border={'solid'}
                        color={'#137798'}
                        borderColor={'#137798'}
                        w={'80%'}
                        background={'none'}
                        borderRadius={'20px'}>Diagnóstico</Button>
                    <Button
                        margin={'10px'}
                        border={'solid'}
                        color={'#137798'}
                        borderColor={'#137798'}
                        w={'80%'}
                        background={'none'}
                        borderRadius={'20px'}>Notas</Button>
                    <Button
                        margin={'10px'}
                        border={'solid'}
                        color={'#137798'}
                        borderColor={'#137798'}
                        w={'80%'}
                        background={'none'}
                        borderRadius={'20px'}>Anexos</Button>
                    <Button
                        margin={'10px'}
                        border={'solid'}
                        color={'#137798'}
                        borderColor={'#137798'}
                        w={'80%'}
                        background={'none'}
                        borderRadius={'20px'}>Biblografía</Button>
                </Box>
            </Grid>
            <Button
                marginBottom={{ lg: '-5%', md: '-8%', sm: '-10%' }}
                marginLeft={{ lg: '88%', md: '70%', sm: '77%' }}
                borderRadius={'20px'}
                bgColor={'#137797'}
                color='#ffff'>
                Procesar
            </Button>
            <Modal
                size={size}
                maxWidth='100%'
                isOpen={showModal}
                onClose={toggleModal}>
                <ModalOverlay />
                <ModalContent bg="#ffff">
                    <ModalHeader>
                        <Button
                            borderRadius={'50%'}
                            colorScheme="blue"
                            width="40px"
                            height="40px"
                            marginLeft={'95%'}
                            marginTop={'-60px'}
                            bgColor={'#137797'}
                            color='#ffff'
                            onClick={toggleModal}>
                            <CloseButton />
                        </Button>
                    </ModalHeader>
                    <ModalBody>
                        <ModalDescripcion />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
export default ModalInforme;