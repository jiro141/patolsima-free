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
    useBreakpointValue,
    Input
} from "@chakra-ui/react";
import FacturaTerceros from "./FacturaTerceros";
import Confirmacion from "./Confirmacion";
import ModalAbonar from "./ModalAbonar";



const ModalFacturacion = () => {
    //modal
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    const toggleModalConfirmacion = () => {
        setShowModalConfirmacion(!showModalConfirmacion);
    };
    const [showModalAbonar, setShowModalAbonar] = useState(false);
    const toggleModalAbonar = () => {
        setShowModalAbonar(!showModalAbonar);
    };
    //tamaños de modal
    const size = useBreakpointValue({ sm: "sm", lg: "xl", md: 'xs' });
    return (
        <>
            <Box marginTop={'-50px'}>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>
                    <Text margin={'5px'} color={'gray.900'} fontSize={'20px'} >Datos de factura</Text>
                    <Text margin={'18px'} textAlign={{ lg: 'right', sm: 'left' }} color={'gray.500'} fontSize={'20px'} >Recibo N  nnnnnn</Text>
                </Grid>
                <Grid templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(2,1fr)" }}>
                    <Box>
                        <Box margin={'5px'}>
                            <Text  fontSize={'16px'} >Cliente</Text>
                            <Text  fontSize={'14px'}>Amelia Amigo Jordan</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >RIF/CI</Text>
                            <Text  fontSize={'14px'}>26651254</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'}>Fecha</Text>
                            <Text fontSize={'14px'} >15/03/2023</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >Télefono</Text>
                            <Text  fontSize={'14px'}>042563684</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text  fontSize={'16px'} >Dirección</Text>
                            <Text fontSize={'14px'} >Capacho</Text>
                        </Box>
                    </Box>
                </Grid>
                <Button
                    marginTop={'2px'}
                    marginLeft={{ lg: '70%', md: '60%', sm: '40%' }}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'
                    onClick={toggleModal}>
                    Factura para un tercero
                </Button>
                <Text margin={'5px'} fontSize={'20px'}>Descripción</Text>
                <Grid templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(2,1fr)" }}>
                    <Box>
                        <Box margin={'5px'} >
                            <Text fontSize={'16px'} ># Estudio</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>B:023-2023</Text>
                            <Text  fontSize={'14px'}marginTop={'5px'}>CE:013-2023</Text>
                        </Box>
                    </Box>
                    <Box >
                        <Box  margin={'5px'}  >
                            <Text fontSize={'16px'} >Paciente</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>Jose felipe colmenares colenares</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>Javiera de Castellanos</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={' 5px '}>
                            <Text fontSize={'16px'} >Tipo de estudio</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>Biopsia</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>Citología especial</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={' 5px'}>
                            <Text  fontSize={'16px'} >Monto($)</Text>
                            <Input margin={'1%'} maxW={'80%'} maxH={'70%'} placeholder='Monto ($):'
                            type="text"></Input>
                            <Input margin={'1%'}  maxW={'80%'} maxH={'70%'} placeholder='Monto ($):'
                            type="text"></Input>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >Monto(Bs)</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>722,10 Bs</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>722,10 Bs</Text>
                        </Box>
                    </Box>
                </Grid>
                <Grid margin={'10px'} templateColumns={{ lg: "repeat(4,1fr)", md: "repeat(4,1fr)", sm: "repeat(2,1fr)" }} >
                    <Box>
                        <Box margin={'10px'}>
                            <Text margin={'5px'} fontSize={'20px'}>Monto</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>Dolares ($)</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>Bolivares (Bs)</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text margin={'5px'} fontSize={'20px'}>Pendiente</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>60$</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>1.444,2 Bs</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text margin={'5px'} fontSize={'20px'}>Abonado</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>0$</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>00,00 Bs</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text margin={'5px'} fontSize={'20px'}>Total</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>60$</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>1.44,20 Bs</Text>
                        </Box>
                    </Box>
                </Grid>
                <Button
                    marginBottom={{ lg: '-10%', md: '-13%', sm: '-25%' }}
                    marginLeft={'1%'}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'>
                    Archivar
                </Button>
                <Button
                    marginBottom={{ lg: '-10.5%', md: '-13%', sm: '-25%' }}
                    marginLeft={{ lg: '50%', md: '52%', sm: '12%' }}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'
                    onClick={toggleModalAbonar}>
                    Abonar
                </Button>
                <Button
                    marginBottom={{ lg: '-3.5%', md: '-5%', sm: '-10%' }}
                    marginLeft={{ lg: '85%', md: '85%', sm: '75%' }}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'
                    onClick={toggleModalConfirmacion}>
                    Confirmar
                </Button>
            </Box>
            <Modal
                size={"lg"}
                maxWidth='100%'
                isOpen={showModal}
                onClose={toggleModal}>
                <ModalOverlay />
                <ModalContent bg="#ffff" borderRadius={"20px"}>
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
            <Modal
                size={"xs"}
                maxWidth='100%'
                isOpen={showModalConfirmacion}
                onClose={toggleModalConfirmacion}>
                <ModalOverlay />
                <ModalContent marginTop={"15%"} bg="#ffff" borderRadius={"20px"}>
                    <ModalBody>
                        <Confirmacion />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal
                size={"sm"}
                maxWidth='100%'
                isOpen={showModalAbonar}
                onClose={toggleModalAbonar}>
                <ModalOverlay />
                <ModalContent marginTop={"15%"} bg="#ffff" borderRadius={"20px"}>
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
                            onClick={toggleModalAbonar}>
                            <CloseButton />
                        </Button>
                    </ModalHeader>
                    <ModalBody>
                        <ModalAbonar />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
export default ModalFacturacion;