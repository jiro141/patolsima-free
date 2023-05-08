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
import FacturaTerceros from "./FacturaTerceros";


const ModalFacturacion = () => {
    //modal
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    //tamaños de modal
    const size = useBreakpointValue({ sm: "sm", lg: "xl", md: 'xs' });
    return (
        <>
            <Box marginTop={'-50px'}>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>
                    <Text margin={'10px'} color={'gray.900'} fontSize={'20px'} >Datos de factura</Text>
                    <Text margin={'18px'} textAlign={{ lg: 'right', sm: 'left' }} color={'gray.500'} fontSize={'20px'} >Recibo N  nnnnnn</Text>
                </Grid>
                <Grid templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(2,1fr)" }}>
                    <Box>
                        <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Cliente</Text>
                            <Text >Amelia Amigo Jordan</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text fontWeight={'bold'} >RIF/CI</Text>
                            <Text >26651254</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text fontWeight={'bold'} >Fecha de recepción</Text>
                            <Text >15/03/2023</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text fontWeight={'bold'} >Télefono</Text>
                            <Text >042563684</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text fontWeight={'bold'} >Dirección</Text>
                            <Text >Capacho</Text>
                        </Box>
                    </Box>
                </Grid>
                <Button
                    marginTop={'2px'}
                    marginLeft={{ lg: '75%', md: '60%', sm: '40%' }}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'
                    onClick={toggleModal}>
                    Factura para un tercero
                </Button>
                <Text margin={'10px'} fontSize={'20px'}>Descripción</Text>
                <Grid templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(2,1fr)" }}>
                    <Box>
                        <Box margin={'10px'}>
                            <Text fontWeight={'bold'}># Estudio</Text>
                            <Text marginTop={'5px'}>B:023-2023</Text>
                            <Text marginTop={'5px'}>CE:013-2023</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Paciente</Text>
                            <Text marginTop={'5px'}>Jose felipe colmenares colenares</Text>
                            <Text marginTop={'5px'}>Javiera de Castellanos</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={' 10px 5px 10px 30px'}>
                            <Text fontWeight={'bold'}>Tipo de estudio</Text>
                            <Text marginTop={'5px'}>Biopsia</Text>
                            <Text marginTop={'5px'}>Citología especial</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={' 10px 5px 10px 30px'}>
                            <Text fontWeight={'bold'}>Monto($)</Text>
                            <Text marginTop={'5px'}>30$</Text>
                            <Text marginTop={'5px'}>30$</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Monto(Bs)</Text>
                            <Text marginTop={'5px'}>722,10 Bs</Text>
                            <Text marginTop={'5px'}>722,10 Bs</Text>
                        </Box>
                    </Box>
                </Grid>
                <Grid margin={'20px'} templateColumns={{ lg: "repeat(4,1fr)", md: "repeat(4,1fr)", sm: "repeat(2,1fr)" }} >
                    <Box>
                        <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Monto</Text>
                            <Text marginTop={'5px'}>Dolares ($)</Text>
                            <Text marginTop={'5px'}>Bolivares (Bs)</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Pendiente</Text>
                            <Text marginTop={'5px'}>60$</Text>
                            <Text marginTop={'5px'}>1.444,2 Bs</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Abonado</Text>
                            <Text marginTop={'5px'}>0$</Text>
                            <Text marginTop={'5px'}>00,00 Bs</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Total</Text>
                            <Text marginTop={'5px'}>60$</Text>
                            <Text marginTop={'5px'}>1.44,20 Bs</Text>
                        </Box>
                    </Box>
                </Grid>
                <Button
                    marginBottom={{ lg: '-8%', md: '-13%', sm: '-25%' }}
                    marginLeft={'1%'}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'>
                    Archivar
                </Button>
                <Button
                    marginBottom={{ lg: '-8%', md: '-13%', sm: '-25%' }}
                    marginLeft={{ lg: '68%', md: '52%', sm: '12%' }}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'>
                    Abonar
                </Button>
                <Button
                    marginBottom={{ lg: '-3%', md: '-5%', sm: '-10%' }}
                    marginLeft={{ lg: '90%', md: '85%', sm: '75%' }}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'>
                    Confirmar
                </Button>
            </Box>
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
                            marginLeft={'92%'}
                            marginTop={'-60px'}
                            bgColor={'#137797'}
                            color='#ffff'
                            onClick={toggleModal}>
                            <CloseButton />
                        </Button>
                    </ModalHeader>
                    <ModalBody>
                        <FacturaTerceros />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
export default ModalFacturacion;